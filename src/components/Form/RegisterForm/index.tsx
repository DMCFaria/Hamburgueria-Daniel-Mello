import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { iRegisterFormData } from '../../../providers/@types';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext';

const registerSchema = yup.object().shape({
  name: yup.string().required('O nome é Obrigatório.'),
  email: yup
    .string()
    .required('O e-mail é Obrigatório.')
    .email('Preencha um email valido!'),
  password: yup
    .string()
    .required('Senha Obrigatória.')
    .matches(/(?=.*?[A-Z])/, 'É necessário pelo menos uma letra maiúscula.')
    .matches(/(?=.*?[a-z])/, 'É necessário pelo menos uma letra minúscula.')
    .matches(/(?=.*?[0-9])/, 'É necessário pelo menos um número.')
    .matches(
      /(?=.*?[#?!@$%^&*-])/,
      'É necessário pelo menos um caractere especial.'
    )
    .min(8, 'É necessário uma senha de pelo menos 8 caracteres.'),

  confirmPassword: yup
    .string()
    .required('Confirmar a senha é Obrigatório.')
    .oneOf([yup.ref('password')], 'As senhas não correspondem.'),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterFormData>({
    resolver: yupResolver(registerSchema),
  });
  const { userRegister } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(userRegister)}>
      <Input
        type='text'
        label='Nome'
        defaultValue=''
        placeholder='Digite seu nome'
        name='name'
        register={register}
        errors={errors.name?.message}
      />
      <Input
        type='email'
        label='E-mail'
        defaultValue=''
        placeholder='Digite seu e-mail'
        name='email'
        register={register}
        errors={errors.email?.message}
      />
      <Input
        type='text'
        label='Senha'
        defaultValue=''
        placeholder='Digite sua senha'
        name='password'
        register={register}
        errors={errors.password?.message}
      />

      <Input
        type='text'
        label='Confirme sua senha'
        defaultValue=''
        placeholder='Digite sua senha novamente'
        name='confirmPassword'
        register={register}
        errors={errors.confirmPassword?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
