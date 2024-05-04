import { useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import { RiGraduationCapFill } from "react-icons/ri";
import { PiStudentFill, PiUserBold } from "react-icons/pi";
import { ImSpinner2 } from "react-icons/im";
import ErrorStrip from "../ErrorStrip";

const MainContainer = styled.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
  color: #1a202c;
  &.dark {
    background: linear-gradient(to bottom, #1a202c, #2d3748);
    color: #cbd5e0;
  }
`;

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(138, 43, 226, 0.5);
  padding: 0.5rem;
  font-size: 0.75rem;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
  &.dark {
    background: rgba(39, 47, 63, 0.5);
  }
`;

const SectionContainer = styled.section`
  position: relative;
  z-index: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  gap: 0.5rem;
  white-space: nowrap;
  font-size: 3rem;
  @media (min-width: 768px) {
    font-size: 5rem;
  }
  @media (min-width: 1024px) {
    gap: 1rem;
  }
`;

const CollegeTitle = styled.h1`
  font-family: 'Spectral', serif;
  font-weight: 600;
  color: #334155;
  &.dark {
    color: #e5e7eb;
  }
`;

const FormContainer = styled.section`
  position: relative;
  z-index: 0;
  width: 70%;
  justify-self: center;
  border-radius: 2rem;
  background-color: #f0f0f0;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
  &:hover,
  &:focus {
    opacity: 1;
  }
  &.dark {
    background-color: #060913;
  }
  @media (max-width: 640px) {
    width: min(50%, 360px);
  }
  @media (max-width: 768px) {
    width: min(40%, 360px);
  }
  @media (min-width: 1280px) {
    width: min(23%, 360px);
  }
`;

const StyledForm = styled.form`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  color: #334155;
  ::placeholder {
    color: #cbd5e0;
    &.dark{
      color: #8b5cf6;
    }
  }
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.1rem; 
`;

const RadioLabel = styled.label`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  &.dark {
    border-left: 1.5px solid #7c3aed;
    border-top: 1.5px solid #7c3aed;
    border-style: solid;
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const UserTypeCon= styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0.25rem 0;
  font-size: 5rem;
  transition: all 0.2s ease-in-out;
  @media (min-width: 768px) {
    padding: 0.75rem 0 0;
  }
  &.dark {
    border-left: 1.5px solid #7c3aed;
    border-right: 1.5px solid #7c3aed;
    border-style: solid;
  }
`;

const StudentIcon = styled(PiStudentFill)`
  border-radius: 9999px;
  border: 3px solid #1e293b;
  padding: 0.25rem;
  font-weight: 300;
  &.dark {
    border-color: #e5e7eb;
  }
  @media (min-width: 768px) {
    padding: 0.5rem;
  }
`;

const TeacherorAdminIcon = styled(PiUserBold)`
  border-radius: 9999px;
  border: 3px solid #1e293b;
  padding: 0.25rem;
  font-weight: 300;
  &.dark {
    border-color: #e5e7eb;
  }
  @media (min-width: 768px) {
    padding: 0.5rem;
  }
`;

const CapIcon = styled(RiGraduationCapFill )`
  border-radius: 9999px;
  border: 3px solid #1e293b;
  padding: 0.25rem;
  font-weight: 300;
  font-size: 100px;
  &.dark {
    border-color: #e5e7eb;
  }
  @media (min-width: 768px) {
    padding: 0.5rem;
  }
`;

const PartSection = styled.section`
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  padding: 1rem 1rem 1rem;
  &.dark {
    border-left: 1.5px solid #7c3aed;
    border-right: 1.5px solid #7c3aed;
    border-bottom: 1.5px solid #7c3aed;
    border-style: solid;
  }
`;

const InputField = styled.input`
  margin-bottom: 1rem;
  display: block;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.5px solid #94a3b8;
  border-style: solid;
  padding: 0.25rem 0.5rem;
  outline: none;
  &::selection {
    border-color: #e2e8f0;
  }
  &:focus {
    border-color: #00d0a3;
  }
  &.dark {
    border-color: #e5e7eb;
    caret-color: inherit;
    &:focus,
    &:active {
      border-color: #a78bfa;
    }
  }
`;

const ForgotPasswordButton = styled.button`
  font-weight: 600;
  color: #6ba14b;
  text-decoration-line: underline;
  text-decoration-thickness: 1.5px;
  transition: color 0.3s; 
  &:hover,
  &:focus {
    text-decoration-line: underline;
    color: #6bcebe;
  }
  &.dark {
    color: #a78bfa;
  }
`;

const LoginButton = styled.button`
  margin-bottom: 0.25rem;
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border-radius: 0.375rem;
  border: 1.5px solid #000000;
  border-style: solid;
  background-color: #6bc6d0;
  padding: 0.25rem;
  font-weight: bold;
  font-size: 0.875rem;
  color: #ffffff;
  &:hover,
  &:focus {
    background-color: #00e5e3;
    border-color: #000000;
  }
  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
  &.dark {
    border-color: #a78bfa;
    background-color: #7c3aed;
    color: #f0f0f0;
    &:hover,
    &:focus {
      background-color: #1e293b;
    }
  }
  @media (min-width: 1024px) {
    margin-bottom: 0.5rem;
  }
`;

const UserTypeContainer = styled.p`
  width: 100%;
  background-color: #92e2ff;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 3rem 0;
  text-align: center;
  font-weight: 700;
  &.dark {
    background-color: #312e81;
  }
  &.dark {
    background-color: #5b21b6;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [message, setMessage] = useState("");

  const slowLoadingIndicator = () => {
    setTimeout(() => {
      setMessage(
        "NOTE:Web Services on the free instance type are automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up."
      );
    }, 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userType === "") {
      setError({
        response: {
          data: "Choose User Type",
        },
      });
    } 
    else {
      setButtonText("Loading...");
      slowLoadingIndicator();
      try {
        const response = await axios.post("/auth/login/" + userType, {
          username,
          password,
        });
        await setUser({ ...response.data, userType });
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...response.data, userType })
        );
      } catch (err) {
        setError(err);
        setButtonText("Login");
      }
    }
  };

  useEffect(() => {
    if ("userDetails" in localStorage) {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
    }
    setUserType("");
    setMessage("");
  }, [setUserType, setMessage, setUser]);

  return (
    <>
      {!user?._id ? (
        <MainContainer>
          {message && !error && (
            <StyledHeader>
              {message}
            </StyledHeader>
          )}
          <SectionContainer>
            <RiGraduationCapFill />
            <CollegeTitle>AMS</CollegeTitle>
          </SectionContainer>
          <FormContainer>
            <StyledForm onSubmit={(e) => handleLogin(e)}>
              <FormSection>
                <FlexContainer>
                  <RadioLabel className="radio" htmlFor="staff">
                    Admin/Teacher
                    <RadioInput
                      type="radio"
                      value="staff"
                      id="staff"
                      name="userType"
                      onClick={() => setUserType("staff")}
                    />
                  </RadioLabel>
                  <RadioLabel className="radio" htmlFor="student">
                    Student
                    <RadioInput
                      type="radio"
                      value="student"
                      id="student"
                      name="userType"
                      onClick={() => setUserType("student")}
                    />
                  </RadioLabel>
                </FlexContainer>
                <UserTypeCon>
                  {userType === "student" ? (
                    <StudentIcon />
                    ) : userType === "staff" ? (
                      <TeacherorAdminIcon />
                      ) : (
                        <CapIcon/>
                        )}
                </UserTypeCon>
              </FormSection>
              <PartSection>
              {userType?
              <>
                <InputField
                  placeholder="username"
                  id="username"
                  type="text"
                  required
                  autoComplete="off"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                <InputField
                  placeholder="password"
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <LoginButton
                  type="submit"
                  value="Login"
                  disabled={buttonText !== "Login"}
                  onClick={(e) => handleLogin(e)}
                >
                  {!(buttonText === "Login") && (
                    <ImSpinner2 className="animate-spin" />
                    )}
                  {buttonText}
                </LoginButton>
                </>
                : <UserTypeContainer>Choose Your User Type</UserTypeContainer>  }
                {error ? <ErrorStrip error={error} /> : ""}
                <ForgotPasswordButton type="button"
                  onClick={() => navigate("./register/reg_student")}
                  >
                  Register
                </ForgotPasswordButton>
              </PartSection>
            </StyledForm>
          </FormContainer>
        </MainContainer>
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login;
