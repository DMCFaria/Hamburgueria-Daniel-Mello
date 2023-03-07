import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { iLoginFormData } from '../../../providers/@types';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginFormData>();

  const { userLogin } = useContext(UserContext);
  return (
    <StyledForm onSubmit={handleSubmit(userLogin)}>
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
        type='password'
        label='Senha'
        defaultValue=''
        placeholder='Digite sua senha'
        name='password'
        register={register}
        errors={errors.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
