import styled from 'styled-components';

const Errormessage = styled.p`
  margin: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
  border-radius: 0.25rem;
  background-color: rgba(248, 113, 113, 0.5);
  padding: 0.25rem;
  text-align: center;
  font-weight: 500;
  color: #991b1b;
  &.dark{
    background-color: transparent;
  }
`;

const ErrorStrip = ({ error }) => {
  return (
    <Errormessage>
      {error?.response?.data?.message ||
        error?.data?.message ||
        error?.response?.data}
    </Errormessage>
  );
};

export default ErrorStrip;
