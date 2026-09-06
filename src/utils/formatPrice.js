export const formatPrice = (amount) => {
  if (amount == null) return "";
  return amount.toLocaleString("en-NG") + ".00";
};
