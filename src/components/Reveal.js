import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { fadeInUp } from '../utils/animations'

/*
 * Reveal — wraps content and fades/slides it up the first time it
 * scrolls into view. Keeps children horizontally centered so it can be
 * dropped into the existing flex-column section layouts safely.
 */
const RevealWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  will-change: transform, opacity;

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeInUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: ${$delay}ms;
    `}
`

const Reveal = ({ children, delay = 0, threshold = 0.15 }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <RevealWrap ref={ref} $visible={visible} $delay={delay}>
      {children}
    </RevealWrap>
  )
}

export default Reveal
