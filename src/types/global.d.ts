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
    Sentry?: {
      captureException(exception: any): string
      captureMessage(
        message: string,
        captureContext?: // SeverityLevel
        'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
      ): string
    }
    Swiper?: any
  }
}
