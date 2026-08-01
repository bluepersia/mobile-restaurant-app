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

export { addToCart };
