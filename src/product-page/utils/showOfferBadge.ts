export function showOfferBadge(selector: string, copy: string) {
  const badge = document.querySelector<HTMLElement>(selector)
  if (badge?.lastElementChild?.textContent) {
    badge.lastElementChild.textContent = copy
    badge.style.display = 'flex'
  }
}
