import type { CartItem } from "../../types/CartItem";
import type { CartContextReturn, CartContextState } from "./CartContext.types";
import { addToCart } from "./CartContext.utils.js";

export default function CartContext(): CartContextReturn {
  let state: CartContextState = {
    cart: [],
  };

  function addItem(id: number): void {
    state = addToCart(state, id);
  }

  function getCart(): CartItem[] {
    return state.cart;
  }

  return {
    addItem,
    getCart,
  };
}
