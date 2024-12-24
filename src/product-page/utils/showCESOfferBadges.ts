export function showCESOfferBadges() {
  const badgeAnnualSubDefault = document.getElementById(
    'badge-annual-sub-offer'
  )
  const cesOfferBadges = document.querySelectorAll<HTMLElement>(
    '.ces-discount-badge'
  )

  if (!cesOfferBadges.length || !badgeAnnualSubDefault) return

  badgeAnnualSubDefault.style.display = 'none'

  cesOfferBadges.forEach(badge => {
    badge.style.display = 'flex'
  })
}
