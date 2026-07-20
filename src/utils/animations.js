import { keyframes, css } from 'styled-components'

/* Shared motion language used across the whole site */

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

export const gradientMove = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export const floatOrb = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -40px) scale(1.1); }
  66%  { transform: translate(-25px, 25px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
`

/* Animated purple -> cyan gradient text, reused by every section title */
export const gradientTitle = css`
  background: linear-gradient(90deg, #854ce6, #00d4ff, #854ce6);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 6s linear infinite;
`
