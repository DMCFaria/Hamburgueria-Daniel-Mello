import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iCardContext, iProviderProps, iProducts } from './@types';
import { api } from '../services/api';

export const CartContext = createContext({} as iCardContext);

export const CartContextProvider = ({ children }: iProviderProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<iProducts[]>([]);
  const [carts, setCarts] = useState<iProducts[]>([]);
  const token = localStorage.getItem('@TOKEN');

  const searchCart = (event: React.ChangeEvent | any) => {
    setSearch(event.target.value);
  };

  const searchList = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const loadCart = localStorage.getItem('@CART');
  useEffect(() => {
    const local: () => void = async () => {
      try {
        const response = await api.get('products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        if (loadCart) {
          const cart = JSON.parse(loadCart);
          setCarts(cart);
        }
      } catch (error) {
        window.localStorage.clear();
        navigate('/');
      }
    };
    local();
  }, [token]);

  const toAdd = (product: iProducts) => {
    const retorno = carts.find((cart) => cart.id === product.id);
    const validation = products.some((element) => element.id === retorno?.id);

    if (!validation) {
      toast.success('Produto adicionado com sucesso!');
      setCarts([...carts, product]);
    } else {
      toast.error('Produto já existente no carrinho');
    }
    localStorage.setItem('@CART', JSON.stringify([...carts, product]));
  };

  const toRemove = (product: iProducts) => {
    const retorno = carts.filter((cart) => cart.id !== product.id);
    toast.success('Produto removido com sucesso');
    setCarts(retorno);
  };

  const remove = () => {
    setCarts([]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        search,
        setSearch,
        searchList,
        searchCart,
        toAdd,
        carts,
        setCarts,
        toRemove,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
