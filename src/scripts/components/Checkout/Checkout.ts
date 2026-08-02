import type { CheckoutReturn } from "./Checkout.types";

export default function Checkout(root: HTMLDialogElement): CheckoutReturn {
  let displaySubmission: (name: string) => void = () => {};

  const formEl = root.querySelector<HTMLFormElement>("[data-form]")!;

  formEl.addEventListener("submit", pay);

  function open(): void {
    root.showModal();
  }

  function pay(e: SubmitEvent): void {
    if (!(e.target instanceof HTMLFormElement)) return;

    e.preventDefault();

    const formData = new FormData(e.target);

    root.close();

    displaySubmission(formData.get("name") as string);
  }

  return {
    open,
    setDisplaySubmission: (newDisplaySubmission: (name: string) => void) => {
      displaySubmission = newDisplaySubmission;
    },
  };
}
