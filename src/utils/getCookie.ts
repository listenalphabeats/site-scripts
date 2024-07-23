import { safeDecodeURIComponent } from './safeDecodeURIComponent'

export function getCookie<T>(name: string) {
  name += '='
  const cookies = document.cookie.split(';')
  const cookie = cookies.find(c => c.trim().substring(0, name.length) === name)

  const data: T | null = cookie
    ? JSON.parse(safeDecodeURIComponent(cookie.trim().substring(name.length)))
    : null

  return data
}
