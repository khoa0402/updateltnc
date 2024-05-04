import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import UserContext from "../../Hooks/UserContext";
import styled from 'styled-components';

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
  background-image: linear-gradient(to bottom, #0f172a, rgba(122, 42, 235, 0.375));
  &.dark {
    background-image: linear-gradient(to top, #0f172a, rgba(122, 42, 235, 0.375));
  }
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
    background-image: linear-gradient(to top, #0f172a, rgba(122, 42, 235, 0.75));
    color: #d1d5db;
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: #6f00ff;
  &.dark {
    color: #d1d5db;
  }
`;


const ErrorElement = () => {
  const { user } = useContext(UserContext);
  const error = useRouteError();

  return (
    <MainWrapper>
      {user && <Header />}
      <ContentWrapper>
        {user && <Nav />}
        <OutletWrapper>
          <Heading>
            Oops!
          </Heading>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </OutletWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default ErrorElement;
