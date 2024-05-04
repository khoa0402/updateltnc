import React from "react";
import { PiStudentFill, PiUserBold } from "react-icons/pi";
import styled from 'styled-components';
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

const MainWrapper = styled.main`
  position: relative;
  z-index: 0;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, #94a3b8, #e2e8f0);
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #1f2937;
  transition: background-image 0.3s ease-in-out;
  &.dark {
    background-image: linear-gradient(to bottom, #1e293b, #0f172a);
    color: #f1f5f9;
  }
`;

const SectionWrapper = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  height: fit-content;
  width: fit-content;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 0.375rem;
  background-color: #f1f5f9;
  padding: 1rem;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
  animation: fadeInFast 0.2s ease-in-out;
  &:hover,
  &:focus {
    opacity: 1;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    width: 50%;
  }
  &.dark {
    background-color: #060913;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const IconsWrapper = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  @media (min-width: 1024px) {
    flex-direction: column;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledIcon = styled.div`
  border-radius: 9999px;
  border: 2.5px solid #1f2937;
  padding: 2px;
  font-size: 2.5rem;
  font-weight: 300;
  transition: border-color 0.3s ease-in-out;
  @media (min-width: 768px) {
    padding: 0.5rem;
  }
  &.dark {
    border-color: #e2e8f0;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  font-family: "Spectral", serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #9c83e3;
  &:hover {
    text-decoration-color: #7c3aed;
    text-decoration-line: underline;
    text-decoration-thickness: 1.5px;
    transition: text-decoration-color 0.3s ease-in-out;
  }
  &.dark {
    color: #f1f5f9;
    text-decoration-color: #8b5cf6;

    &:hover {
      text-decoration-color: #a78bfa;
    }
  }
`;

const LinkText = styled.p`
  text-decoration-line: underline;
  text-decoration-color: #6b21a8;
  text-decoration-thickness: 2px;
  transition: text-decoration-color 0.3s ease-in-out;
  &:hover {
    text-decoration-color: #7c3aed;
  }
  &.dark {
    text-decoration-color: #8b5cf6;
    &:hover {
      text-decoration-color: #a78bfa;
    }
  }
`;

const StyledOutlet = styled.div`
  width: 100%;
  overflow-y: auto;
`;

// layout of the register route
const ResetLayout = () => {
  const location = useLocation().pathname;

  return (
    <MainWrapper id="register"
    >
      <SectionWrapper>
        <HeaderWrapper>
          <Heading>
            {location === "/register/reg_staff" ? "Admin/Teacher" : "Student"}
            <br />
            Register
          </Heading>
          <IconsWrapper>
            <IconContainer>
              <NavLink to={"./reg_staff"}>
                <StyledIcon>
                  <PiUserBold />
                </StyledIcon>
              </NavLink>
              <NavLink to={"./reg_student"}>
                <StyledIcon>
                  <PiStudentFill />
                </StyledIcon>
              </NavLink>
            </IconContainer>
            <StyledLink to="../"
            >
              <LinkText>
                Return
              </LinkText>
            </StyledLink>
          </IconsWrapper>
        </HeaderWrapper>
        <StyledOutlet>
          <Outlet />
        </StyledOutlet>
      </SectionWrapper>
    </MainWrapper>
  );
};

export default ResetLayout;
