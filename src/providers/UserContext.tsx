import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import {
  iUserContext,
  iProviderProps,
  iRegisterFormData,
  iLoginFormData,
} from './@types';
import { api } from '../services/api';

export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserContextProvider = ({ children }: iProviderProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      const userAutoLogin = async () => {
        try {
          const response = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate('/shop');
        } catch (error) {
          console.log(error);
        }
      };
      userAutoLogin();
    }
  }, []);

  const userRegister: SubmitHandler<iRegisterFormData> = async (data) => {
    try {
      await api.post('users', data);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Ops! Algo deu errado');
    }
  };
  const userLogin = async (data: iLoginFormData) => {
    try {
      const response = await api.post('login', data);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USER', JSON.stringify(response.data.user.id));
      toast.success('Login realizado com sucesso!');
      navigate('/shop');
    } catch (error) {
      toast.error('Email ou senha incorretos');
    }
  };

  const userLogout: () => void = () => {
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ userRegister, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
