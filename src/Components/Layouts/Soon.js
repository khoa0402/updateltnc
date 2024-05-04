import React from "react";
import { BsConeStriped } from "react-icons/bs";
import styled from "styled-components";

const ConstructionSection = styled.section`
  width: 100%;
  white-space: break-spaces;
  border-radius: 0.375rem;
  background-color: rgba(148, 163, 184, 0.5);
  padding: 1rem;
  text-align: justify;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #e2e8f0;
  }
  @media (min-width: 1024px) {
    width: 66.666667%;
  }
  &.dark {
    background-color: rgba(107, 114, 128, 0.5);
    &:hover {
      background-color: #1e293b;
    }
  }
`;

const ConstructionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
`;

const BsConeicon = styled.div`
  font-size: 5rem;
  color: #ed8936; 
`;

const ConstructionHeading = styled.h1`
  display: inline;
  font-weight: 600;
`;

const Soon = () => {
  return (
    <ConstructionSection>
      <ConstructionContent>
        <BsConeicon>
          <BsConeStriped/>
        </BsConeicon>
        <ConstructionHeading>Under Construction</ConstructionHeading>
      </ConstructionContent>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga libero
        sunt odio deserunt amet laudantium nam officiis corrupti animi adipisci.
        Ex expedita officiis, nam explicabo iste dolore ab. Fugit harum
        cupiditate rem repudiandae aut dolorum culpa pariatur voluptas
        consectetur maxime ullam possimus atque, iste optio repellendus natus a?
        Aliquid dolore nesciunt. quis dignissimos sint dolorem itaque porro?
      </p>
    </ConstructionSection>
  );
};

export default Soon;
