export interface FinsweetCookieConsent {
  consentController?: {
    on: (event: string, handler: () => void) => void
    off: (event: string, handler: () => void) => void
  }
  store: {
    confirmed: boolean
  }
}
