export function handleInitialTab(params: {
  tabSelector: string
  searchParamName: string
}) {
  const searchParams = new URLSearchParams(window.location.search)
  if (!searchParams.has(params.searchParamName)) return

  const index = searchParams.get(params.searchParamName)
  if (!index) return

  const tabs = document.querySelectorAll<HTMLAnchorElement>(params.tabSelector)
  if (!tabs) return

  const tab = tabs[Number(index)]
  if (!tab) return

  setTimeout(() => tab.click())
}
