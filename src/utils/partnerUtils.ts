export const PARTNERS_PATH = 'partners'

export function setPartnerNameInStorage(name: string) {
  localStorage.setItem('partner', name)
}

export function getPartnerNameInStorage() {
  return localStorage.getItem('partner')
}

export function redirectToPartnerPage(partnerName: string) {
  return window.location.replace(`/${PARTNERS_PATH}/${partnerName}`)
}
