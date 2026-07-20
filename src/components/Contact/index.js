import React from 'react'
import styled from 'styled-components'
import { MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import Reveal from '../Reveal'
import { gradientTitle } from '../../utils/animations'

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 44px;
text-align: center;
font-weight: 700;
margin-top: 20px;
  ${gradientTitle}
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const ContactCards = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 32px;
`

const ContactCard = styled.a`
  flex: 1;
  min-width: 240px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: ${({ theme }) => theme.card};
  padding: 22px 24px;
  border: 1px solid rgba(133, 76, 230, 0.25);
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease, border-color 0.35s ease;
  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(133, 76, 230, 0.6);
    box-shadow: 0 16px 44px rgba(133, 76, 230, 0.28);
  }
`

const IconWrap = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 24px;
  color: #fff;
  background: linear-gradient(135deg, #854ce6, #00d4ff);
  box-shadow: 0 6px 18px rgba(133, 76, 230, 0.4);
`

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`

const CardLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
`

const CardValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  word-break: break-all;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Contact = () => {
  return (
    <Container id="contact">
      <Wrapper>
        <Reveal>
          <Title>Contact</Title>
          <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        </Reveal>
        <Reveal delay={150}>
          <ContactCards>
            <ContactCard href="mailto:swagatapal1980@gmail.com">
              <IconWrap>
                <MdEmail />
              </IconWrap>
              <CardText>
                <CardLabel>Email</CardLabel>
                <CardValue>swagatapal1980@gmail.com</CardValue>
              </CardText>
            </ContactCard>
            <ContactCard href="tel:+919800072183">
              <IconWrap>
                <FaPhoneAlt />
              </IconWrap>
              <CardText>
                <CardLabel>Phone</CardLabel>
                <CardValue>+91 98000 72183</CardValue>
              </CardText>
            </ContactCard>
          </ContactCards>
        </Reveal>
      </Wrapper>
    </Container>
  )
}

export default Contact
