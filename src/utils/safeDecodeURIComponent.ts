export function safeDecodeURIComponent(str: string) {
  function isURLEncoded(str: string) {
    try {
      const decodedStr = decodeURIComponent(str)
      return encodeURIComponent(decodedStr) !== str
    } catch (e) {
      return false
    }
  }

  return isURLEncoded(str) ? decodeURIComponent(str) : str
}
