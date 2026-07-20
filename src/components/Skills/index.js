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
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  max-width: 620px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

/* Two columns: the featured Gen-AI card on the left, the rest stacked right */
const SkillsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  margin-top: 26px;
  gap: 18px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`

/* Right-hand column: the remaining categories stacked vertically */
const StackColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  @media (max-width: 900px) {
    gap: 14px;
  }
`

/* Card reveals on scroll, has gradient border + glow on hover */
const Skill = styled.div`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(133, 76, 230, 0.35);
  box-shadow: rgba(23, 92, 230, 0.12) 0px 3px 16px;
  border-radius: 14px;
  padding: 16px 18px;
  overflow: hidden;

  /* the featured Gen-AI card gets a stronger accent */
  ${({ $featured, theme }) =>
    $featured &&
    css`
      border-color: rgba(133, 76, 230, 0.6);
      background: linear-gradient(
          160deg,
          rgba(133, 76, 230, 0.08),
          rgba(0, 212, 255, 0.04)
        ),
        ${theme.card};
      box-shadow: 0 4px 24px rgba(133, 76, 230, 0.2);
    `}
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
    border-radius: 14px;
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
    transform: translateY(-5px);
    border-color: transparent;
    box-shadow: 0 10px 28px rgba(133, 76, 230, 0.3);
  }
  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 500px) {
    padding: 14px 16px;
  }
`

const SkillTitle = styled.h2`
  font-size: ${({ $featured }) => ($featured ? '19px' : '17px')};
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: '';
    display: block;
    margin: 7px auto 0;
    width: 34px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #854CE6, #00d4ff);
  }
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 2px;
`

const SkillItem = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_primary + 'cc'};
  border: 1px solid rgba(133, 76, 230, 0.4);
  border-radius: 999px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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
    transform: translateY(-2px) scale(1.06);
    color: ${({ theme }) => theme.text_primary};
    border-color: #854CE6;
    background: rgba(133, 76, 230, 0.14);
    box-shadow: 0 4px 12px rgba(133, 76, 230, 0.3);
  }
  &:hover::after {
    animation: ${shimmer} 0.9s ease;
  }

  @media (max-width: 500px) {
    font-size: 12px;
    padding: 5px 9px;
  }
`

const SkillImage = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: contain;
  flex-shrink: 0;
`

/* Gradient letter badge shown when a skill has no logo (or one fails) */
const IconFallback = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #854CE6, #00d4ff);
  box-shadow: 0 2px 6px rgba(133, 76, 230, 0.4);
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
const SkillCard = ({ skill, index, featured = false }) => {
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
    <Skill ref={ref} $visible={visible} $delay={index * 90} $featured={featured}>
      <SkillTitle $featured={featured}>{skill.title}</SkillTitle>
      <SkillList>
        {skill.skills.map((item, i) => (
          <SkillChip
            key={item.name}
            item={item}
            visible={visible}
            delay={index * 90 + 160 + i * 22}
          />
        ))}
      </SkillList>
    </Skill>
  )
}

const Skills = () => {
  /* The Gen-AI category is much larger than the rest, so it gets its own
     column and the remaining categories stack alongside it. */
  const [featured, ...rest] = skills

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
          <SkillCard skill={featured} index={0} featured />
          <StackColumn>
            {rest.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index + 1} />
            ))}
          </StackColumn>
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills
