import type { CartContextReturn } from "../../contexts/CartContext/CartContext.types";
import type { CartItem, FullCartItem } from "../../types/CartItem";
import type { MenuItem } from "../../types/MenuItem";
import type { OrderReturn } from "./Order.types";
import {
  generateOrderFromCart,
  generateOrderItemsHTML,
  generateSubmissionHTML,
} from "./Order.utils.js";

export default function Order(
  root: HTMLElement,
  cartContext: CartContextReturn,
  menu: MenuItem[],
): OrderReturn {
  let openCheckout: () => void = () => {};

  const innerEl = root.querySelector("[data-inner]")!;
  const itemsEl = root.querySelector("[data-items]")!;
  const totalPriceEl = root.querySelector("[data-total-price]")!;
  const completeBtn = root.querySelector<HTMLElement>("[data-complete]")!;

  root.addEventListener("click", handleClick);
  completeBtn.addEventListener("click", handleCompleteClick);

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

  function handleCompleteClick(): void {
    openCheckout();
  }

  function displaySubmission(name: string): void {
    innerEl.innerHTML = generateSubmissionHTML(name);
    cartContext.empty();
    cartContext.freeze();
  }

  return {
    setOpenCheckout: (newOpenCheckout) => {
      openCheckout = newOpenCheckout;
    },
    displaySubmission,
  };
}
