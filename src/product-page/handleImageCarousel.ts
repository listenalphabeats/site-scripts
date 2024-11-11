export function handleImageCarousel() {
  const { Swiper } = window
  if (Swiper) {
    const carousels = document.querySelectorAll('.product-image-carousel')

    for (const item of carousels) {
      const smallContainer = item.querySelector(
        '.product-thumb-small_container'
      )
      const productThumbnails = new Swiper(smallContainer, {
        wrapperClass: 'product-thumb-small_wrapper',
        slideClass: 'product-thumb-small_slide',
        slidesPerView: 'auto',
        direction: 'horizontal',
        spaceBetween: 0,
      })

      const productSwiperEl = item.querySelector(
        '.swiper-navigation_component.is-product-thumbnail'
      )

      const largeSwiper = item.querySelector('.product-thumb-large_container')

      new Swiper(largeSwiper, {
        wrapperClass: 'product-thumb-large_wrapper',
        slideClass: 'product-thumb-large_slide',
        loop: true,
        slidesPerView: 1,
        direction: 'horizontal',
        spaceBetween: 0,
        effect: 'fade',
        // autoHeight: true,
        grabCursor: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        thumbs: {
          swiper: productThumbnails,
          slideThumbActiveClass: 'is-active',
        },
        pagination: {
          el: productSwiperEl?.querySelector('.swiper-pagination'),
          bulletClass: 'swiper-pagination_bullet',
          bulletActiveClass: 'is-active',
          clickable: true,
          dynamicBullets: false,
        },
        navigation: {
          nextEl: productSwiperEl?.querySelector('[data-action=next-slide]'),
          prevEl: productSwiperEl?.querySelector('[data-action=prev-slide]'),
        },
      })
    }
  }
}
