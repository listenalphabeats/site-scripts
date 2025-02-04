import { MUSE_IN_BOX_TRIAL_SEARCH_PARAM } from '../../config'
import { setDisplay } from './setDisplay'

export function handleMuseInBoxBadge() {
  const requestParams = new URLSearchParams(window.location.search)
  if (!requestParams.has(MUSE_IN_BOX_TRIAL_SEARCH_PARAM)) return
  const badgeAnnualSubDefault = document.getElementById(
    'badge-annual-sub-offer'
  )
  const badgeAnnualSubMonthTrial = document.getElementById(
    'badge-annual-sub-month-trial'
  )

  setDisplay(badgeAnnualSubDefault, false)
  setDisplay(badgeAnnualSubMonthTrial, true)
}
