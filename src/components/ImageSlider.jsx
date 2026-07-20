import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

/*
 * ImageSlider — shows a single image or a swipeable/clickable carousel.
 * Controls (arrows, dots, counter) are hidden automatically when there
 * is only one image, so it degrades to a plain image.
 */

const SliderRoot = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.2);
`

const Track = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateX(${({ $index }) => -$index * 100}%);
`

const Slide = styled.img`
  width: 100%;
  flex: 0 0 100%;
  object-fit: cover;
  display: block;
`

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 10px;' : 'right: 10px;')}
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  transition: background 0.25s ease, transform 0.25s ease;
  &:hover {
    background: #854ce6;
    transform: translateY(-50%) scale(1.1);
  }
  @media only screen and (max-width: 600px) {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
`

const Dots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
`

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '22px' : '8px')};
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? 'linear-gradient(90deg, #854ce6, #00d4ff)' : 'rgba(255,255,255,0.5)'};
  transition: width 0.3s ease, background 0.3s ease;
`

const Counter = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
`

const ImageSlider = ({ images = [], alt = '' }) => {
  const [index, setIndex] = useState(0)
  const count = images.length

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  )

  /* arrow-key navigation while the slider is mounted */
  useEffect(() => {
    if (count <= 1) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, next, prev])

  if (count === 0) return null

  return (
    <SliderRoot>
      <Track $index={index}>
        {images.map((src, i) => (
          <Slide key={src} src={src} alt={`${alt} screenshot ${i + 1}`} />
        ))}
      </Track>

      {count > 1 && (
        <>
          <Arrow $side="left" onClick={prev} aria-label="Previous image">
            <MdChevronLeft />
          </Arrow>
          <Arrow $side="right" onClick={next} aria-label="Next image">
            <MdChevronRight />
          </Arrow>
          <Counter>
            {index + 1} / {count}
          </Counter>
          <Dots>
            {images.map((src, i) => (
              <Dot
                key={src}
                $active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </Dots>
        </>
      )}
    </SliderRoot>
  )
}

export default ImageSlider
