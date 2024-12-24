export function setSearchParam(key: string, value: string) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState({}, '', url)
}

export function getSearchParam(key: string) {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(key)
}
