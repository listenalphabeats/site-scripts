export function setActive(element, isActive) {
  element?.classList[isActive ? 'add' : 'remove']('active')
}
