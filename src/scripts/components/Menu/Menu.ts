import type { CartContextReturn } from "../../contexts/CartContext/CartContext.types";
import { generateMenuHTML } from "./Menu.utils.js";

export default function Menu(
  root: HTMLElement,
  cartContext: CartContextReturn,
): void {
  const listEl = root.querySelector("[data-list]")!;

  root.addEventListener("click", handleClick);

  init();

  function init(): void {
    fetch("/assets/data/menu.json")
      .then((res) => res.json())
      .then((data) => (listEl.innerHTML = generateMenuHTML(data)));
  }
  function handleClick(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement)) return;

    if (e.target.dataset.add) {
      cartContext.addItem(Number(e.target.dataset.add));
    }
  }
}
