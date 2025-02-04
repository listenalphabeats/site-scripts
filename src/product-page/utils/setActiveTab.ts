export function setActiveTab(tabSelector: string, index: number) {
  const tabs = document.querySelectorAll<HTMLAnchorElement>(tabSelector)
  if (!tabs) return

  const tab = tabs[index]
  if (!tab) return

  setTimeout(() => tab.click())
}
