type OrderReturn = {
  setOpenCheckout: (openCheckout: () => void) => void;
  displaySubmission: (name: string) => void;
};

export { OrderReturn };
