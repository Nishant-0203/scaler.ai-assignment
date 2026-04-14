'use client';
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { cartAPI } from '@/lib/api';
import { getSessionId } from '@/lib/session';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false, error: null });

  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const sessionId = getSessionId();
      const items = await cartAPI.get(sessionId);
      dispatch({ type: 'SET_CART', payload: items });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const sessionId = getSessionId();
      await cartAPI.add({ sessionId, productId, quantity });
      await fetchCart();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartAPI.update(itemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await cartAPI.remove(itemId);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      await cartAPI.clear(sessionId);
      dispatch({ type: 'SET_CART', payload: [] });
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = state.items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items: state.items,
      loading: state.loading,
      error: state.error,
      cartCount,
      cartSubtotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      refetch: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
