type CheckoutReturn = {
  open: () => void;
  setDisplaySubmission: (displaySubmission: (name: string) => void) => void;
};

export { CheckoutReturn };
