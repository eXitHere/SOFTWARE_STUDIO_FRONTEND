/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from 'react'

import im1 from 'assets/images/im1.jpg'
import im2 from 'assets/images/im2.jpg'
import im3 from 'assets/images/im3.jpg'

const featuredImages = [im1, im2, im3]
const imageLength = featuredImages.length
// let slideInterval: any

export const ImageShow = () => {
  const [idxImage, setIdxImage] = useState(0)
  const refNext = useRef(null)

  const refs = featuredImages.reduce((acc: any, val, i) => {
    acc[i] = React.createRef()
    return acc
  }, {})

  // disable auto slide
  // useEffect(() => {
  //   startSlider()
  //   return () => {
  //     clearInterval(slideInterval)
  //   }
  // }, [])

  // const startSlider = () => {
  //   slideInterval = setInterval(() => {
  //     refNext.current.click()
  //   }, 3500)
  // }

  const scrollToImage = (i: number) => {
    setIdxImage(i)

    refs[i].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  // image controller
  const nextImage = () => {
    if (idxImage >= imageLength - 1) {
      scrollToImage(0)
    } else {
      scrollToImage(idxImage + 1)
    }
  }

  const prevImage = () => {
    if (idxImage === 0) {
      scrollToImage(imageLength - 1)
    } else {
      scrollToImage(idxImage - 1)
    }
  }

  const arrowStyle =
    'absolute text-white text-2xl z-0 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center'

  // image controller
  return (
    <div className="flex flex-col w-10/12 p-2 mb-4 lg:w-3/5 bg-primary-light">
      <div className="relative w-full">
        <div className="carousel">
          <button type="button" onClick={prevImage} className={`${arrowStyle} left-2`} style={{ top: '40%' }}>
            <span role="img" aria-label={`Arrow left}`}>
              ◀
            </span>
          </button>
          {featuredImages.map((img, i) => (
            <div className="w-full flex-shrink-0 aspect-w-16 aspect-h-9" key={img} ref={refs[i]}>
              <img src={img} className="w-full object-contain" />
            </div>
          ))}
          <button
            type="button"
            onClick={nextImage}
            className={`${arrowStyle} right-2`}
            style={{ top: '40%' }}
            ref={refNext}
          >
            <span role="img" aria-label={`Arrow  right}`}>
              ▶
            </span>
          </button>
        </div>
      </div>
      <div className="text-center opacity-50 text-sm">ภาพจาก www.freepik.com/</div>
    </div>
  )
}
