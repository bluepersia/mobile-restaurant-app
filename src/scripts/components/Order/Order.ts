import type { CartContextReturn } from "../../contexts/CartContext/CartContext.types";
import type { CartItem, FullCartItem } from "../../types/CartItem";
import type { MenuItem } from "../../types/MenuItem";
import {
  generateOrderFromCart,
  generateOrderItemsHTML,
} from "./Order.utils.js";

export default function Order(
  root: HTMLElement,
  cartContext: CartContextReturn,
  menu: MenuItem[],
): void {
  const itemsEl = root.querySelector("[data-items]")!;
  const totalPriceEl = root.querySelector("[data-total-price]")!;

  root.addEventListener("click", handleClick);

  cartContext.onCartChanged.push(renderCart);

  renderCart();

  function renderCart(): void {
    const cart: CartItem[] = cartContext.getCart();

    if (cart.length <= 0) {
      root.style.display = "none";
      return;
    }

    root.style.display = "block";

    const order: FullCartItem[] = generateOrderFromCart(cart, menu);
    itemsEl.innerHTML = generateOrderItemsHTML(order);
    totalPriceEl.textContent = `$${order.reduce((prev, curr) => prev + curr.getSubtotal(), 0)}`;
  }

  function handleClick(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement)) return;

    if (e.target.dataset.remove) {
      cartContext.removeItem(Number(e.target.dataset.remove));
    }
  }
}
