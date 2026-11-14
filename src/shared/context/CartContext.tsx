// ============================================================================
// COFOCO Cart State Management (Context + useReducer)
// Strict TypeScript with localStorage persistence and stock caps
// ============================================================================

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { CartAction, CartItem, CartState, PricingTotals } from '../types';
import { calculateOrderTotals } from '../utils/pricing';

const STORAGE_KEY = 'cofoco_cart_state_v1';

export const initialCartState: CartState = {
  items: [],
  isOpen: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((i) => i.variantId === item.variantId);

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        const existing = newItems[existingIndex];
        const newQty = Math.min(existing.quantity + quantity, existing.maxStock);
        newItems[existingIndex] = { ...existing, quantity: newQty };
      } else {
        const initialQty = Math.min(quantity, item.maxStock);
        newItems = [...state.items, { ...item, quantity: initialQty }];
      }

      return {
        ...state,
        items: newItems,
        isOpen: true, // Auto open drawer on add to bag
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((i) => i.variantId !== action.payload.variantId),
      };
    }

    case 'UPDATE_QTY': {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.variantId !== variantId),
        };
      }

      return {
        ...state,
        items: state.items.map((i) => {
          if (i.variantId === variantId) {
            const capped = Math.min(quantity, i.maxStock);
            return { ...i, quantity: capped };
          }
          return i;
        }),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    case 'TOGGLE_DRAWER': {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case 'SET_DRAWER': {
      return {
        ...state,
        isOpen: action.payload,
      };
    }

    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  totals: PricingTotals;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  setDrawer: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    if (typeof window === 'undefined') return initialCartState;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          items: Array.isArray(parsed.items) ? parsed.items : [],
          isOpen: false,
        };
      }
    } catch (e) {
      console.warn('Failed to parse cart from localStorage:', e);
    }
    return initialCartState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [state.items]);

  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const totals = calculateOrderTotals(state.items);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  };

  const removeItem = (variantId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { variantId } });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleDrawer = () => {
    dispatch({ type: 'TOGGLE_DRAWER' });
  };

  const setDrawer = (open: boolean) => {
    dispatch({ type: 'SET_DRAWER', payload: open });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        items: state.items,
        itemCount,
        isOpen: state.isOpen,
        totals,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleDrawer,
        setDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
