import type { CartItem } from "../../types/CartItem";

type CartContextState = {
  cart: CartItem[];
};

type CartContextReturn = {
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  getCart: () => CartItem[];
  onCartChanged: Array<() => void>;
};

export type { CartContextState, CartContextReturn };
