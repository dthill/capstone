export const displayPrice = (price: number | undefined | null) => {
  price = price || 0;
  return `$ ${price / 100}`
}
