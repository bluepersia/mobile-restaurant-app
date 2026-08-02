import Checkout from "./components/Checkout/Checkout.js";
import Menu from "./components/Menu/Menu.js";
import Order from "./components/Order/Order.js";
import CartContext from "./contexts/CartContext/CartContext.js";
import type { CartContextReturn } from "./contexts/CartContext/CartContext.types";

const cartContext: CartContextReturn = CartContext();

fetch("/assets/data/menu.json")
  .then((res) => res.json())
  .then((data) => {
    Menu(document.getElementById("menu")!, cartContext, data);
    const order = Order(document.getElementById("order")!, cartContext, data);

    const checkout = Checkout(
      document.getElementById("checkout")! as HTMLDialogElement,
    );

    order.setOpenCheckout(() => {
      checkout.open();
    });
    checkout.setDisplaySubmission((name: string) =>
      order.displaySubmission(name),
    );
  });
