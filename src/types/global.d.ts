import { FinsweetCookieConsent } from './FinsweetCookieConsent.type'

declare global {
  interface Window {
    FsCC?: FinsweetCookieConsent
    dataLayer?: any[]
    posthog?: {
      getFeatureFlag(name: string): string
    }
    grecaptcha?: {
      enterprise: {
        execute(sitekey: string, opts?: { action?: string }): Promise<string>
        ready(callback: () => void): void
      }
    }
  }
}
