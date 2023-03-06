import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormRegister } from 'react-hook-form/dist/types';

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
interface iRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<iRegisterFormData>({
  resolver: yupResolver(registerSchema),
});
const submit: SubmitHandler<iRegisterFormData> = (data) => {
  console.log(data);
};
const RegisterForm = () => (
  <StyledForm onSubmit={handleSubmit(submit)}>
    <Input
      label='Nome'
      type='text'
      placeholder='Digite seu nome'
      defaultValue=''
      register={register}
      name='name'
      errors={errors.name?.message}
    />
    <Input
      label='Senha'
      type='text'
      placeholder='Digite sua senha'
      defaultValue=''
      register={register}
      name='password'
      errors={errors.password?.message}
    />
    <Input
      label='E-mail'
      type='text'
      placeholder='Digite seu e-mail'
      defaultValue=''
      register={register}
      name='email'
      errors={errors.email?.message}
    />
    <Input
      label='Confirme a Senha'
      type='text'
      placeholder='Digite sua senha novamente'
      defaultValue=''
      register={register}
      name='confirmPassword'
      errors={errors.confirmPassword?.message}
    />
    <StyledButton $buttonSize='default' $buttonStyle='gray'>
      Cadastrar
    </StyledButton>
  </StyledForm>
);

export default RegisterForm;
