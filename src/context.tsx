import { createContext, useContext, useMemo, useState } from 'react';

import { CartItem, Product } from './types';

interface ActionInterface {
  handleAdd: (product: Product) => void;
  handleIncrement: (id: Product['id']) => void;
  handleDecrement: (id: Product['id']) => void;
}
interface StateInterface {
  cart: Map<string, CartItem>;
  total: number;
  count: number;
}
interface ContextProps {
  state: StateInterface;
  actions: ActionInterface;
}

export const Context = createContext({} as ContextProps);

export const Provider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Map<Product['id'], CartItem>>(
    () => new Map<Product['id'], CartItem>()
  );

  const { total, count } = useMemo(() => {
    return Array.from(cart.values()).reduce(
      ({ total, count }, item) => {
        return {
          total: total + item.count * item.product.price,
          count: count + item.count,
        };
      },
      {
        total: 0,
        count: 0,
      }
    );
  }, [cart]);

  const handleAdd = (product: Product) => {
    const draft = new Map(cart);

    draft.set(product.id, {
      product,
      count: 1,
    });

    setCart(draft);
  };

  const handleDecrement = (id: Product['id']) => {
    const draft = new Map(cart);
    const item = draft.get(id) as CartItem;

    if (item.count === 1) {
      draft.delete(id);
    } else {
      draft.set(id, {
        ...item,
        count: item.count - 1,
      });
    }

    setCart(draft);
  };

  const handleIncrement = (id: Product['id']) => {
    const draft = new Map(cart);
    const item = draft.get(id) as CartItem;

    draft.set(id, {
      ...item,
      count: item.count + 1,
    });

    setCart(draft);
  };

  const state: StateInterface = {
    cart,
    total,
    count,
  };

  const actions: ActionInterface = {
    handleAdd,
    handleIncrement,
    handleDecrement,
  };

  return (
    <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
  );
};

export const useCart = () => {
  const { state, actions } = useContext(Context);

  return {
    state,
    actions,
  };
};
