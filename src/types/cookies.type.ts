export enum BrowserCookies {
  RewardfulReferral = 'rewardful.referral',
}

export type RewardfulBrowserCookie = {
  id: string // UUID
  created_at: string // timestamp
  affiliate: {
    id: string // UUID
    first_name: string
    last_name: string
    name: string
    token: string
  }
  campaign: {
    id: string // UUID
    name: string
  }
  cookie: {
    domain: string
  }
  coupon?: {
    amount_off: number | null
    currency: string | null
    duration: string
    duration_in_months: number | null
    id: string
    name: string
    percent_off: number | null
  }
}
