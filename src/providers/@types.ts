import { ReactNode } from 'react';

export interface iRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface iLoginFormData {
  email: string;
  password: string;
}

export interface iUserContext {
  userRegister: (formData: iRegisterFormData) => void | any;
  userLogin: (formData: iLoginFormData) => void;
  userLogout: () => void;
}
export interface iProviderProps {
  children: ReactNode;
}

export interface iCardContext {
  products: iProducts[];
  setProducts: React.Dispatch<React.SetStateAction<iProducts[]>>;
  carts: iProducts[];
  setCarts: React.Dispatch<React.SetStateAction<iProducts[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchList: iProducts[];
  searchCart: (event: React.ChangeEvent | any) => void;
  toAdd: (product: iProducts) => void;
  toRemove: (product: iProducts) => void;
  remove: () => void;
}

export interface iProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface iProductsProps {
  products: iProducts;
}

export interface iCartModal {
  onClose: () => any;
}
