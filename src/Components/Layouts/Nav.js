import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { GiBookmarklet } from "react-icons/gi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GrSchedules } from "react-icons/gr";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiStudent, PiUser, PiBooks } from "react-icons/pi";
import styled from 'styled-components';

const NavWrapper = styled.nav`
  z-index: 0;
  display: none;
  height: 100%;
  flex-direction: column;
  justify-content: stretch;
  background-color: #42abff;
  padding: 1rem;
  color: #000000;
  @media (min-width: 1024px) {
    display: flex;
  }
  &.dark {
    background-color: #0f172a;
  }
`;

const NavList = styled.ul`
  margin: auto;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const NavItem = styled.li`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(25, 50, 155, 0.5);
  }
`;

const UserInfoWrapper = styled.ul`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 6px;
`;

const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <NavWrapper id="nav">
      <NavList>
        <NavLink to={"./paper"} className="w-full font-medium">
          <NavItem>
            <GiBookmarklet className="pt-[0.1rem] text-2xl  " />
            Subjects
          </NavItem>
        </NavLink>
        <NavLink to={"./attendance"} className="w-full font-medium">
          <NavItem>
            <LuCalendarCheck2 className="pt-[0.1rem] text-2xl  " />
            Attendance
          </NavItem>
        </NavLink>
        <NavLink to={"./internal"} className="w-full font-medium">
          <NavItem>
            <HiOutlineDocumentReport className="pt-[0.1rem] text-2xl  " />
            Internal Mark
          </NavItem>
        </NavLink>
        <NavLink to={"./time_schedule"} className="w-full font-medium">
          <NavItem>
            <GrSchedules className="pt-[0.1rem] text-2xl  " />
            Schedule
          </NavItem>
        </NavLink>
        {user.role === "HOD" && (
          <>
            <NavLink to={"./add_paper"} className="w-full font-medium">
              <NavItem>
                <BiBookAdd className="pt-[0.1rem] text-2xl  " />
                Add Subjects
              </NavItem>
            </NavLink>
            <NavLink to={"./approve_staff"} className="w-full font-medium">
              <NavItem>
                <RiUserAddLine className="pt-[0.1rem] text-2xl  " />
                Approve Staff
              </NavItem>
            </NavLink>
          </>
        )}
        {user.role === "student" && (
          <NavLink to={"./join_paper"} className="w-full font-medium">
            <NavItem>
              <PiBooks className="pt-[0.1rem] text-2xl  " />
              Manage Paper
            </NavItem>
          </NavLink>
        )}
      </NavList>
      <UserInfoWrapper>
        <NavLink to={"./profile"} className="w-full font-medium">
          <NavItem>
            {user.role === "student" ? (
              <PiStudent className="pt-[0.1rem] text-2xl" />
            ) : (
              <PiUser className="pt-[0.1rem] text-2xl" />
            )}
            {user.name}
          </NavItem>
        </NavLink>
      </UserInfoWrapper>
    </NavWrapper>
  );
};

export default Nav;
