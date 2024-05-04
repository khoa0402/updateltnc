import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import styled from "styled-components";

const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
`;

const ContentWrapper = styled.main`
  margin-top: 3.15rem;
  display: flex;
  height: calc(100vh - 3.15rem);
  white-space: nowrap;
  background-color: #0f172a;
`;

const OutletWrapper = styled.div`
  z-index: 1;
  margin-top: 0.25rem;
  width: 100%;
  overflow-y: auto;
  background-color: #f3f4f6;
  padding: 1rem;
  color: #1f2937;
  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
  &.dark {
    background-color: rgba(17, 24, 39, 0.9);
    color: #d1d5db;
  }
`;

// layout of the entire dash/ route
const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;
  return (
    <MainWrapper>
      <Header />
      <ContentWrapper>
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        ) : (
          <Navigate to="/" replace={true} />
        )}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Layout;
