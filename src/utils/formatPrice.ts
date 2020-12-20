export default function formatPrice(price: number): string {
  const rubleSign = '\u20bd';
  const priceString = Intl.NumberFormat('Ru-ru', { style: 'decimal' }).format(price);
  return `${priceString} ${rubleSign}`;
}
