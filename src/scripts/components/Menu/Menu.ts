import type { CartContextReturn } from "../../contexts/CartContext/CartContext.types";
import type { MenuItem } from "../../types/MenuItem";
import { generateMenuHTML } from "./Menu.utils.js";

export default function Menu(
  root: HTMLElement,
  cartContext: CartContextReturn,
  menu: MenuItem[],
): void {
  const listEl = root.querySelector("[data-list]")!;

  root.addEventListener("click", handleClick);

  init();

  function init(): void {
    listEl.innerHTML = generateMenuHTML(menu);
  }
  function handleClick(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement)) return;

    if (e.target.dataset.add) {
      cartContext.addItem(Number(e.target.dataset.add));
    }
  }
}
