import { setActiveTab } from './setActiveTab'

export function handleInitialTab(params: {
  tabSelector: string
  searchParamName: string
}) {
  const searchParams = new URLSearchParams(window.location.search)
  if (!searchParams.has(params.searchParamName)) return

  const index = searchParams.get(params.searchParamName)
  if (!index) return

  setActiveTab(params.tabSelector, Number(index))
}
