import { CloseRounded, GitHub, LinkedIn } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2';


const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: top;
justify-content: center;
overflow-y: scroll;
transition: all 0.5s ease;
`;

const Wrapper = styled.div`
max-width: 800px;
width: 100%;
border-radius: 16px;
margin: 50px 12px;
height: min-content;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 20px;
display: flex;
flex-direction: column;
position: relative;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 8px 6px 0px 6px;
  @media only screen and (max-width: 600px) {
      font-size: 24px;
      margin: 6px 6px 0px 6px;
  }
`;

const Date = styled.div`
    font-size: 16px;
    margin: 2px 6px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`



const Desc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        margin: 6px 6px;
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
`;

const Label = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    margin: 8px 6px;
    @media only screen and (max-width: 600px) {
        font-size: 16px;
        margin: 8px 6px;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0px;
    @media only screen and (max-width: 600px) {
        margin: 4px 0px;
    }
`;

const Tag = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    margin: 4px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primary + 20};
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Members = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-wrap: wrap;
    margin: 12px 6px;
    @media only screen and (max-width: 600px) {
        margin: 4px 6px;
    }
`;

const Member = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 4px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media only screen and (max-width: 600px) {
        width: 32px;
        height: 32px;
    }
`;

const MemberName = styled.div`
    font-size: 16px;
    font-weight: 500;
    width: 200px;
    color: ${({ theme }) => theme.text_primary};
    @media only screen and (max-width: 600px) {
        font-size: 14px;
    }
`;


const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 12px 0px;
    gap: 12px;
`;

const Button = styled.a`
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    padding: 12px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.primary};
    ${({ dull, theme }) => dull && `
        background-color: ${theme.bgLight};
        color: ${theme.text_secondary};
        &:hover {
            background-color: ${({ theme }) => theme.bg + 99};
        }
    `}
    cursor: pointer;
    text-decoration: none;
    transition: all 0.5s ease;
    &:hover {
        background-color: ${({ theme }) => theme.primary + 99};
    }
    @media only screen and (max-width: 600px) {
        font-size: 12px;
    }
`;


const index = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;
    return (
        <Modal open={true} onClose={() => setOpenModal({ state: false, project: null })}>
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpenModal({ state: false, project: null })}
                    />
                    <Image src={project?.image} />
                    <Title>{project?.title}</Title>
                    <Date>{project.date}</Date>
                    <Tags>
                        {project?.tags.map((tag) => (
                            <Tag>{tag}</Tag>
                        ))}
                    </Tags>
                    <Desc>{project?.description}</Desc>
                    {project.member && (
                        <>
                            <Label>Members</Label>
                            <Members>
                                {project?.member.map((member) => (
                                    <Member>
                                        <MemberImage src={member.img} />
                                        <MemberName>{member.name}</MemberName>
                                        <a href={member.github} target="new" style={{textDecoration: 'none', color: 'inherit'}}>
                                            <GitHub />
                                        </a>
                                        <a href={member.linkedin} target="new" style={{textDecoration: 'none', color: 'inherit'}}>
                                            <LinkedIn />
                                        </a>
                                    </Member>
                                ))}
                            </Members>
                        </>
                    )}
                    <ButtonGroup>
                        {/* <Button dull href={project?.github} target='new'>View Code</Button> */}
                        <Button
  dull
  onClick={() => {
    if (!project?.github || project.github.trim() === "") {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Access Restricted',
            text: 'Code is restricted due to company policy.',
            footer: `
              <div style="text-align: left;">
                <strong>For discussion, contact:</strong><br />
                <span>👤 Swagata Pal</span><br />
                <span>📞 Phone: 9800072183</span><br />
                <span>📧 Email: swagatapal2021@gmail.com</span>
              </div>
            `,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          
      setOpenModal({ state: false, project: null })
    } else {
      window.open(project.github, "_blank");
    }
  }}
>
  View Code
</Button>

                        {/* <Button href={project?.webapp} target='new'>View Demo App</Button> */}

                        <Button
  dull
  onClick={() => {
    if (!project?.webapp || project?.webapp.trim() === "") {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'development Mode',
            text: 'Project is in development phase',
            footer: `
              <div style="text-align: left;">
                <strong>For discussion, contact:</strong><br />
                <span>👤 Swagata Pal</span><br />
                <span>📞 Phone: 9800072183</span><br />
                <span>📧 Email: swagatapal2021@gmail.com</span>
              </div>
            `,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          
      setOpenModal({ state: false, project: null })
    } else {
      window.open(project?.webapp, "_blank");
    }
  }}
>
View Demo App
</Button>
                    </ButtonGroup>
                </Wrapper>
            </Container>

        </Modal>
    )
}

export default index