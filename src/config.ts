import { isStaging } from './utils'

export const MUSE_IN_BOX_TRIAL_SEARCH_PARAM = 'in-box-offer'
export const OFFER_GENERIC_SEARCH_PARAM = 'generic'
export const CES_DISCOUNT_OFFER = 'ces-discount'

export const API_ENDPOINT =
  (isStaging()
    ? 'https://api.development.listenalphabeats.nl'
    : 'https://api.listenalphabeats.nl') + '/v1'
