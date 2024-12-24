export function redirectWithParams(params: {
  path: string
  searchParams?: URLSearchParams
}) {
  const url = new URL(params.path, window.location.origin)

  if (params.searchParams) {
    url.search = String(params.searchParams)
  }

  window.location.replace(String(url))
}
