import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { skills } from '../../data/constants'

/* ------------------------------------------------------------------ */
/*  Keyframes                                                          */
/* ------------------------------------------------------------------ */
const floatOrb = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -40px) scale(1.1); }
  66%  { transform: translate(-25px, 25px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
`

const gradientMove = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

const shimmer = keyframes`
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
`

const popIn = keyframes`
  0%   { opacity: 0; transform: translateY(12px) scale(0.9); }
  60%  { opacity: 1; transform: translateY(-2px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
`

/* Animated ambient background orbs */
const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.35;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
`

const OrbOne = styled(Orb)`
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, #854CE6 0%, transparent 70%);
  top: -60px;
  left: -80px;
  animation: ${floatOrb} 16s ease-in-out infinite;
`

const OrbTwo = styled(Orb)`
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
  bottom: -80px;
  right: -100px;
  animation: ${floatOrb} 20s ease-in-out infinite reverse;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`

export const Title = styled.div`
  font-size: 44px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  background: linear-gradient(90deg, #854CE6, #00d4ff, #854CE6);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientMove} 6s linear infinite;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  gap: 30px;
  justify-content: center;
`

/* Card reveals on scroll, has gradient border + glow on hover */
const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(133, 76, 230, 0.35);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 18px;
  padding: 22px 36px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease, border-color 0.35s ease;

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeInUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: ${$delay}ms;
    `}

  /* glowing gradient top edge */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    padding: 1px;
    background: linear-gradient(135deg, #854CE6, transparent 40%, transparent 60%, #00d4ff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    border-color: transparent;
    box-shadow: 0 12px 40px rgba(133, 76, 230, 0.35);
  }
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 16px 28px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 14px 22px;
  }
`

const SkillTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 22px;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: '';
    display: block;
    margin: 10px auto 0;
    width: 48px;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(90deg, #854CE6, #00d4ff);
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 6px;
`

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + 'cc'};
  border: 1px solid rgba(133, 76, 230, 0.4);
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  cursor: default;
  background: rgba(133, 76, 230, 0.04);
  transition: transform 0.25s ease, border-color 0.25s ease,
    background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      opacity: 0;
      animation: ${popIn} 0.45s ease forwards;
      animation-delay: ${$delay}ms;
    `}

  /* shine sweep on hover */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transform: translateX(-120%);
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    color: ${({ theme }) => theme.text_primary};
    border-color: #854CE6;
    background: rgba(133, 76, 230, 0.14);
    box-shadow: 0 6px 18px rgba(133, 76, 230, 0.3);
  }
  &:hover::after {
    animation: ${shimmer} 0.9s ease;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 13px;
    padding: 7px 11px;
  }
`

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  object-fit: contain;
`

/* Gradient letter badge shown when a skill has no logo (or one fails) */
const IconFallback = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #854CE6, #00d4ff);
  box-shadow: 0 2px 8px rgba(133, 76, 230, 0.4);
  flex-shrink: 0;
`

/* ------------------------------------------------------------------ */
/*  Skill chip (handles image with graceful fallback)                 */
/* ------------------------------------------------------------------ */
const SkillChip = ({ item, visible, delay }) => {
  const [broken, setBroken] = useState(false)
  const showFallback = !item.image || broken
  return (
    <SkillItem $visible={visible} $delay={delay}>
      {showFallback ? (
        <IconFallback>{item.name.charAt(0).toUpperCase()}</IconFallback>
      ) : (
        <SkillImage
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      )}
      {item.name}
    </SkillItem>
  )
}

/* ------------------------------------------------------------------ */
/*  Card (reveals when scrolled into view)                            */
/* ------------------------------------------------------------------ */
const SkillCard = ({ skill, index }) => {
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Skill ref={ref} $visible={visible} $delay={index * 120}>
      <SkillTitle>{skill.title}</SkillTitle>
      <SkillList>
        {skill.skills.map((item, i) => (
          <SkillChip
            key={item.name}
            item={item}
            visible={visible}
            delay={index * 120 + 200 + i * 45}
          />
        ))}
      </SkillList>
    </Skill>
  )
}

const Skills = () => {
  return (
    <Container id="skills">
      <OrbOne />
      <OrbTwo />
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          A blend of AI, mobile and backend engineering — here are the tools and
          technologies I work with to build intelligent, production-ready
          products.
        </Desc>
        <SkillsContainer>
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills
