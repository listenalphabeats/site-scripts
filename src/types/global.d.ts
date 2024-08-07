import { FinsweetCookieConsent } from './FinsweetCookieConsent.type'

declare global {
  interface Window {
    FsCC?: FinsweetCookieConsent
    dataLayer?: any[]
    posthog?: {
      getFeatureFlag(name: string): string
    }
    grecaptcha?: {
      execute(sitekey: string, opts?: { action?: string }): Promise<string>
    }
  }
}
