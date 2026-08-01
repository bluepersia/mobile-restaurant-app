import type { CartItem } from "../../types/CartItem";

type CartContextState = {
  cart: CartItem[];
};

type CartContextReturn = {
  addItem: (id: number) => void;
  getCart: () => CartItem[];
};

export type { CartContextState, CartContextReturn };
