import React, { useContext } from "react";
import { RiGraduationCapFill } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: #42abff;
  color: #000000;
  &.dark {
    background-color: #0f172a;
  }
`;

const LogoLink = styled(Link)`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

const LogoText = styled.h1`
  margin: 0;
  padding-right: 0.25rem;
  font-family: "Spectral", serif;
  &:hover {
    text-decoration-color: #8b5cf6;
    text-decoration-line: underline;
    text-decoration-color: #7c3aed;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    transition: text-decoration-color 0.3s ease-in-out;
  }
`;

const LogoutButton = styled(Link)`
  margin: 0.5rem 1rem 0.5rem auto;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  padding: 7px;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  &:hover {
    background-color: #dc2626;
    color: #f1f5f9;
  }
`;

const Header = () => {
  const { setUser, setPaperList } = useContext(UserContext);
  const logout = () => {
    setUser("");
    setPaperList([]);
    localStorage.clear();
    toast.info("Logged Out");
  };
  return (
    <HeaderWrapper>
      <LogoLink to="/dash">
        <RiGraduationCapFill className="m-1" />
        <LogoText>AMS</LogoText>
      </LogoLink>
      <LogoutButton to="./"
        onClick={() => logout()}
      >
        <p>&nbsp;Logout&nbsp;&nbsp;</p>
        <GrLogout className="text-xl" />
      </LogoutButton>
    </HeaderWrapper>
  );
};

export default Header;
