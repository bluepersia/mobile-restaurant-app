import type { CartItem } from "../../types/CartItem";
import type { CartContextReturn, CartContextState } from "./CartContext.types";
import { addToCart, removeFromCart } from "./CartContext.utils.js";

export default function CartContext(): CartContextReturn {
  let state: CartContextState = {
    cart: [],
  };

  const onCartChanged: Array<() => void> = [];

  function addItem(id: number): void {
    state = addToCart(state, id);

    onCartChanged.forEach((el) => el());
  }

  function removeItem(id: number): void {
    state = removeFromCart(state, id);

    onCartChanged.forEach((el) => el());
  }

  function getCart(): CartItem[] {
    return state.cart;
  }

  return {
    addItem,
    removeItem,
    getCart,
    onCartChanged,
  };
}
