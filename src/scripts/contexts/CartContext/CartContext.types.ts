import type { CartItem } from "../../types/CartItem";

type CartContextState = {
  cart: CartItem[];
  isFrozen: boolean;
};

type CartContextReturn = {
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  getCart: () => CartItem[];
  onCartChanged: Array<() => void>;
  freeze: () => void;
  empty: () => void;
};

export type { CartContextState, CartContextReturn };
