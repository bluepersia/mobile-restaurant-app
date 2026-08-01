import Menu from "./components/Menu/Menu.js";
import CartContext from "./contexts/CartContext/CartContext.js";
import type { CartContextReturn } from "./contexts/CartContext/CartContext.types";

const cartContext: CartContextReturn = CartContext();

Menu(document.getElementById("menu")!, cartContext);
