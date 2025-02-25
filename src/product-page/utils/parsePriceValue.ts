export function parsePriceValue(priceElement: Element | null) {
  if (!priceElement) return
  const priceString = priceElement.textContent
  if (!priceString) return
  const match = priceString.match(/\$(\d+(?:\.\d{2})?)/)
  if (!match) return
  return Number(match[1])
}
