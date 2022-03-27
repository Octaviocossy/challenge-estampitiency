import { createContext, useReducer } from 'react';

import { Product } from './types';

interface ContextProps {
  cartAmount: () => number;
  addProduct: (product: Product) => void;
  handleButtons: (id: Product['id']) => boolean;
  removeProduct: (id: Product['id']) => void;
  quantityPerProduct: (id: Product['id']) => number;
  numberOfProductsInCart: () => number;
}
interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface InitialStateTypes {
  cart: Product[];
}

type Actions =
  | { type: 'addProduct'; payload: Product }
  | { type: 'removeProduct'; payload: Product[] };

const initialState: InitialStateTypes = {
  cart: [],
};

const cartReducer = (
  state: InitialStateTypes,
  action: Actions
): InitialStateTypes => {
  if (action.type === 'addProduct') {
    return {
      ...state,
      cart: [...state.cart, action.payload],
    };
  }
  if (action.type === 'removeProduct') {
    return {
      ...state,
      cart: action.payload,
    };
  }

  return state;
};

export const CartContext = createContext({} as ContextProps);

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product: Product) => {
    dispatch({ type: 'addProduct', payload: product });
  };

  const removeProduct = (id: Product['id']) => {
    const filtTheOtherItems = state.cart.filter((item) => item.id !== id);
    const filtItemToRemove = state.cart.filter((item) => item.id === id);

    filtItemToRemove.splice(0, 1);
    dispatch({
      type: 'removeProduct',
      payload: [...filtItemToRemove, ...filtTheOtherItems],
    });
  };

  const handleButtons = (id: Product['id']): boolean => {
    return state.cart.some((product) => product.id === id);
  };

  const numberOfProductsInCart = (): number => {
    return state.cart.length;
  };

  const cartAmount = (): number => {
    return state.cart.reduce((acc, product) => acc + product.price, 0);
  };

  const quantityPerProduct = (id: Product['id']): number => {
    return state.cart.filter((product) => product.id === id).length;
  };

  return (
    <CartContext.Provider
      value={{
        addProduct,
        cartAmount,
        handleButtons,
        removeProduct,
        quantityPerProduct,
        numberOfProductsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
