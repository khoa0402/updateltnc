import React from "react";
import UserContext from "../../Hooks/UserContext";
import Loading from "../Layouts/Loading";
import axios from "../../config/api/axios";
import { PiStudentFill, PiUserBold } from "react-icons/pi";
import styled from "styled-components";

const StyledMain = styled.main`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    width: fit-content;
  }
`;

const StyledProfileContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
  &.dark {
    border: 1px solid #64748b;
    padding: 1px;
  }
`;

const StyledNameAndRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const StyledName = styled.h2`
  white-space: break-spaces;
  font-size: 1.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: inherit;
  text-decoration-thickness: 2px;
  text-underline-offset: 1rem;
  color: #1e3a8a;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  &.dark {
    margin-top: 0;
    color: #94a3b8;
  }
`;

const StyledRole = styled.p`
  font-size: 1.125rem;
  text-transform: capitalize;
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StyledTableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 0.375rem;
  border: 2px solid #1e293b;
  &.dark {
    border-color: #64748b;
    padding: 1px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  & > tbody > tr {
    border-top: 1px solid #94a3b8;
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  &.dark {
    & > tbody > tr {
      border-color: #64748b;
    }
  }
`;

const StyledTableRow = styled.tr`
  border-top: 1px solid #94a3b8;
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
  &.dark {
    border-color: #64748b;
  }
`;

const StyledTableHeader = styled.th`
  background-color: #1e293b;
  color: #f1f5f9;
  padding: 1rem;
  text-transform: capitalize;
  font-size: 1rem;
`;

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const getProfile = async () => {
      const response = await axios.get(`${user.userType}/${user._id}`);
      setProfile(response.data);
    };
    getProfile();
  }, [user]);

  return (
    <StyledMain>
      {profile.name ? (
        <>
          <StyledProfileContainer>
            {user.userType === "staff" ? (
              <PiUserBold className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            ) : (
              <PiStudentFill className="m-2 rounded-full border-2 border-slate-900 p-1 text-6xl font-light dark:border-slate-300 md:p-2 md:text-9xl lg:text-[12rem]" />
            )}
            <StyledNameAndRoleContainer>
              <StyledName>
                {user?.name}
              </StyledName>
              <StyledRole>
                {user?.role}
              </StyledRole>
            </StyledNameAndRoleContainer>
          </StyledProfileContainer>
          <StyledTableContainer>
            <StyledTable>
              <tbody>
                {Object.keys(profile).map((key, index) => (
                  <StyledTableRow
                    key={index}
                  >
                    <StyledTableHeader>
                      {key}
                    </StyledTableHeader>
                    <td className="px-4 py-2">{profile[key]}</td>
                  </StyledTableRow>
                ))}
              </tbody>
            </StyledTable>
          </StyledTableContainer>
        </>
      ) : (
        <Loading />
      )}
    </StyledMain>
  );
};

export default Profile;
