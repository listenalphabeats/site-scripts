import { isStaging } from './utils'

export const MUSE_IN_BOX_TRIAL_SEARCH_PARAM = 'in-box-offer'
export const OFFER_GENERIC_SEARCH_PARAM = 'generic'
export const CES_DISCOUNT_OFFER = 'ces-discount'
export const OFFER_MUSERS_FEB_SEARCH_PARAM = 'musers-feb'
export const OFFER_MUSERS_ACTIVATION_SEARCH_PARAM = 'muse-partner-discount'

export const API_ENDPOINT =
  (isStaging()
    ? 'https://api.development.listenalphabeats.nl'
    : 'https://api.listenalphabeats.nl') + '/v1'
