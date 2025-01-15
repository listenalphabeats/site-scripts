import type { FinsweetCookieConsent } from './FinsweetCookieConsent.type'
import type { Swiper } from 'swiper/types'

declare global {
  interface Window {
    FsCC?: FinsweetCookieConsent
    dataLayer?: any[]
    posthog?: {
      getFeatureFlag(name: string): string
      capture(eventName: string, data?: object): void
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
    Swiper?: typeof Swiper
  }
}
