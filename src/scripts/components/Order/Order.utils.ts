import type { CartItem, FullCartItem } from "../../types/CartItem";
import type { MenuItem } from "../../types/MenuItem";

function generateOrderFromCart(
  cart: CartItem[],
  menu: MenuItem[],
): FullCartItem[] {
  const fullCartItems: FullCartItem[] = cart.map((cartItem) => {
    const menuItem: MenuItem | undefined = menu.find(
      (item) => item.id === cartItem.id,
    );
    if (!menuItem) throw Error("Menu item doesn't exist");

    return {
      ...cartItem,
      ...menuItem,
      getSubtotal: function () {
        return menuItem.price * cartItem.quantity;
      },
    };
  });

  return fullCartItems;
}

function generateOrderItemsHTML(order: FullCartItem[]): string {
  return order
    .map(
      ({ id, name, quantity, getSubtotal }) => `
       <li class="order__item">
            <h3 class="order__item-title">${name}${quantity > 1 ? ` (${quantity})` : ""}</h3>
            <button class="order__item-remove-btn" data-remove="${id}">
                remove
            </button>
            <p class="order__item-price">$${getSubtotal()}</p>
        </li>`,
    )
    .join("\n");
}

export { generateOrderFromCart, generateOrderItemsHTML };
