import type { SwiperOptions } from 'swiper/types'

export function handleImageCarousel() {
  const { Swiper } = window
  if (!Swiper) return

  // Inject CSS
  const style = document.createElement('style')
  style.textContent = `
    .product_image_carousel .product-thumb-large_slide {
      width: 100% !important;
    }
  `
  document.head.appendChild(style)

  const carousels = document.querySelectorAll('.product-image-carousel')
  const carouselsMob = document.querySelectorAll('.product_image_carousel')

  for (const item of carousels) {
    connectSwiper(item, false)
  }

  for (const item of carouselsMob) {
    connectSwiper(item, true)
  }

  function connectSwiper(item: Element, isMobile: boolean) {
    const imageField = item.querySelector<HTMLElement>(
      '.product-thumb-large_container'
    )
    if (!Swiper || !imageField) return

    const pagination = item.querySelector(
      '.swiper-navigation_component.is-product-thumbnail'
    )

    // Base configuration for both mobile and desktop
    const swiperConfig: SwiperOptions = {
      wrapperClass: 'product-thumb-large_wrapper',
      slideClass: 'product-thumb-large_slide',
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,
      effect: 'fade',
      loop: true,
      keyboard: {
        onlyInViewport: true,
        enabled: true,
      },
      pagination: {
        el: pagination?.querySelector<HTMLElement>('.swiper-pagination'),
        bulletClass: 'swiper-pagination_bullet',
        bulletActiveClass: 'is-active',
        dynamicBullets: false,
        clickable: true,
      },
    }

    if (isMobile) {
      Object.assign(swiperConfig, {
        fadeEffect: {
          crossFade: true,
        },
      } as SwiperOptions)
    } else {
      // Desktop-specific configuration
      Object.assign(swiperConfig, {
        navigation: {
          nextEl: pagination?.querySelector('[data-action=next-slide]'),
          prevEl: pagination?.querySelector('[data-action=prev-slide]'),
        },
      } as SwiperOptions)

      // Setup thumbnails for desktop
      const smallContainer = item.querySelector<HTMLElement>(
        '.product-thumb-small_container'
      )
      if (smallContainer) {
        const productThumbnails = new Swiper(smallContainer, {
          wrapperClass: 'product-thumb-small_wrapper',
          slideClass: 'product-thumb-small_slide',
          direction: 'horizontal',
          slidesPerView: 'auto',
          spaceBetween: 0,
        })

        Object.assign(swiperConfig, {
          thumbs: {
            swiper: productThumbnails,
            slideThumbActiveClass: 'is-active',
          },
        } as SwiperOptions)
      }
    }

    new Swiper(imageField, swiperConfig)
  }
}
