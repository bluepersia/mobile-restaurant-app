import type { CartItem } from "../../types/CartItem";
import type { CartContextState } from "./CartContext.types";

function addToCart(state: CartContextState, id: number): CartContextState {
  const newCart: CartItem[] = [...state.cart];
  const itemInCart: CartItem | undefined = state.cart.find(
    (item) => item.id === id,
  );

  if (itemInCart) {
    const newItem: CartItem = {
      ...itemInCart,
      quantity: itemInCart.quantity + 1,
    };
    newCart[state.cart.indexOf(itemInCart)] = newItem;
    return {
      ...state,
      cart: newCart,
    };
  }

  newCart.push({
    id,
    quantity: 1,
  });

  return {
    ...state,
    cart: newCart,
  };
}

function removeFromCart(state: CartContextState, id: number): CartContextState {
  const itemInCart: CartItem | undefined = state.cart.find(
    (item) => item.id === id,
  );

  if (!itemInCart) return state;

  const newItem: CartItem = { ...itemInCart };
  newItem.quantity--;

  if (newItem.quantity <= 0) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== id),
    };
  }
  const newCart: CartItem[] = [...state.cart];
  newCart[state.cart.indexOf(itemInCart)] = newItem;

  return {
    ...state,
    cart: newCart,
  };
}

function freezeState(state: CartContextState): CartContextState {
  return {
    ...state,
    isFrozen: true,
  };
}

function emptyCart(state: CartContextState): CartContextState {
  return {
    ...state,
    cart: [],
  };
}

export { addToCart, removeFromCart, freezeState, emptyCart };
