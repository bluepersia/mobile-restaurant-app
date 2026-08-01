import type { MenuItem } from "../../types/MenuItem";

function generateMenuHTML(data: MenuItem[]): string {
  return data
    .map(
      ({ id, name, ingredients, price, emoji }) => `
        <li class="product-card">
              <p class="product-card__img">${emoji}</p>
              <div class="product-card__content">
                <h3 class="product-card__title">${name}</h3>
                <p class="product-card__ingredients">
                  ${ingredients}
                </p>
                <p class="product-card__price">$${price}</p>
              </div>
              <button
                class="product-card__add-btn"
                aria-label="Add to order"
                data-add="${id}"
              >
                +
              </button>
            </li>`,
    )
    .join("\n");
}

export { generateMenuHTML };
