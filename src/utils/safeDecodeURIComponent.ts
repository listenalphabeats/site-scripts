export function safeDecodeURIComponent(str: string) {
  return isURLEncoded(str) ? decodeURIComponent(str) : str
}

function isURLEncoded(str: string) {
  try {
    const decodedStr = decodeURIComponent(str)
    return encodeURIComponent(decodedStr) !== str
  } catch (e) {
    return false
  }
}
