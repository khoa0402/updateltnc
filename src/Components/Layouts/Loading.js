import React from "react";
import styled from "styled-components";
import { ImSpinner2 } from "react-icons/im";

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Loading = () => {
  return (
    <Container>
      <ImSpinner2 className="animate-spin" />
      Loading...
    </Container>
  );
};

export default Loading;
