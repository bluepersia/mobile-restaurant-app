import type { CartItem } from "../../types/CartItem";
import type { CartContextReturn, CartContextState } from "./CartContext.types";
import {
  addToCart,
  emptyCart,
  freezeState,
  removeFromCart,
} from "./CartContext.utils.js";

export default function CartContext(): CartContextReturn {
  let state: CartContextState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    isFrozen: false,
  };

  const onCartChanged: Array<() => void> = [];

  function addItem(id: number): void {
    const newState = addToCart(state, id);

    if (newState === state) return;

    state = newState;

    save();

    onCartChanged.forEach((el) => el());
  }

  function removeItem(id: number): void {
    const newState = removeFromCart(state, id);

    if (newState === state) return;

    state = newState;

    save();

    onCartChanged.forEach((el) => el());
  }

  function empty(): void {
    state = emptyCart(state);

    save();
  }

  function getCart(): CartItem[] {
    return state.cart;
  }

  function freeze(): void {
    state = freezeState(state);
  }

  function save(): void {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }

  return {
    addItem,
    removeItem,
    getCart,
    onCartChanged,
    freeze,
    empty,
  };
}
