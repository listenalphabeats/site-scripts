import { FinsweetCookieConsent } from './FinsweetCookieConsent.type'

declare global {
  interface Window {
    FsCC?: FinsweetCookieConsent
    dataLayer?: any[]
    posthog?: {
      getFeatureFlag(name: string): string
    }
  }
}
