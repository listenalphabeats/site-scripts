export function parsePriceValue(priceElement: Element | null) {
  if (!priceElement) return
  const priceString = priceElement.textContent
  if (!priceString) return
  const value = priceString.replace('$', '')
  return Number(value)
}
