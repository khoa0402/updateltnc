import { Link } from "react-router-dom";
import { GiBookmarklet } from "react-icons/gi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GrSchedules } from "react-icons/gr";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import styled from 'styled-components';

const StyledHeader = styled.h2`
  margin: 1.5rem;
  font-family: 'Spectral', serif;
  font-size: 3.75rem;
  font-weight: 700;
  text-align: center;
  color: #9066a4;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  place-content: center;
  gap: 0.75rem;
  padding: 1rem 0.25rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    padding: 1rem 2rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background-color: #d8b4fe;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  transition-property: background-color, color;
  transition-duration: 200ms;
  &:hover {
    background-color: rgba(168, 139, 253, 0.9);
  }
  @media (min-width: 1024px) {
    font-size: 1.125rem;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(99, 102, 241, 0.8);
    &:hover {
      background-color: #6366f1;
      color: #f3f4f6;
    }
  }
`;


const Dash = () => {
  const { user, setPaperList } = useContext(UserContext);

  useEffect(() => {
    const getPapers = async () => {
      const response = await axios.get(`paper/${user.userType}/${user._id}`);
      setPaperList(response.data);
    };
    getPapers();
  }, [setPaperList, user]);

  return (
    <main className="self-center">
      <StyledHeader>
        Academic Management System
      </StyledHeader>
      <StyledGrid>
        <StyledLink
          to={"./paper"}
        >
          <GiBookmarklet className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Subjects
            <p className="text-sm font-normal lg:text-base ">
              View Papers and Notes
            </p>
          </div>
        </StyledLink>

        <StyledLink
          to={"./attendance"}
        >
          <LuCalendarCheck2 className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Attendance
            <p className="text-sm font-normal lg:text-base ">
              Add or Edit Attendance
            </p>
          </div>
        </StyledLink>

        <StyledLink
          to={"./internal"}
        >
          <HiOutlineDocumentReport className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Internal Mark
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Internal Marks
            </p>
          </div>
        </StyledLink>

        <StyledLink
          to={"./time_schedule"}
        >
          <GrSchedules className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Schedule
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Time Schedule
            </p>
          </div>
        </StyledLink>

        {user.role === "HOD" && (
          <>
            <StyledLink
              to={"./add_paper"}
            >
              <BiBookAdd className="text-[2.5rem] lg:text-[4rem] " />
              <div className="font-semibold">
                Add Subjects
                <p className="text-sm font-normal lg:text-base ">
                  Add a New Paper
                </p>
              </div>
            </StyledLink>

            <StyledLink
              to={"./approve_staff"}
            >
              <RiUserAddLine className="text-[2.5rem] lg:text-[4rem] " />
              <div className="font-semibold">
                Approve Staff
                <p className="text-sm font-normal lg:text-base ">
                  Approve registered staff(s)
                </p>
              </div>
            </StyledLink>
          </>
        )}
        {user.role === "student" && (
          <StyledLink
            to={"./join_paper"}
          >
            <PiBooks className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Manage Subjects
              <p className="text-sm font-normal lg:text-base ">
                Join or Leave Paper
              </p>
            </div>
          </StyledLink>
        )}
        <StyledLink
          to={"./profile"}
        >
          {user.role === "student" ? (
            <PiStudent className="text-[2.5rem] lg:text-[4rem] " />
          ) : (
            <PiUser className="text-[2.5rem] lg:text-[4rem] " />
          )}
          <div className="font-semibold">
            Profile
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Profile
            </p>
          </div>
        </StyledLink>
      </StyledGrid>
    </main>
  );
};

export default Dash;
