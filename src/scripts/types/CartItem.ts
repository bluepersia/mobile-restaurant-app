import type { MenuItem } from "./MenuItem";

type CartItem = {
  id: number;
  quantity: number;
};

type FullCartItem = CartItem &
  MenuItem & {
    getSubtotal: () => number;
  };

export type { CartItem, FullCartItem };
