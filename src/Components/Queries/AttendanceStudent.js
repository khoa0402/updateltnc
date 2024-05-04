import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';
import { TbDeviceDesktopSearch } from "react-icons/tb";

const Title = styled.h2`
  margin-bottom: 0.5rem;
  text-align: center;
  margin-top: 0.75rem;
  white-space: break-spaces;
  font-size: 2.25rem;
  font-weight: bold;
  color: #cf6684;
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  &.dark {
    margin-top: 0;
    color: #e5e5e5;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  gap: 1rem;
  accent-color: #8b5cf6;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledInput = styled.input`
  margin-bottom: 1rem;
  display: block;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border-width: 1.5px;
  border-style: solid;
  border-color: #94a3b8;
  padding: 0.25rem 0.5rem;
  padding-left: 0.5rem;
  outline: none;
  caret-color: inherit;
  &::selection {
    border-color: #e2e8f0;
  }
  &:focus {
    border-color: #8b5cf6;
  }
  @media (prefers-color-scheme: dark) {
    border-color: #e2e8f0;
    caret-color: inherit;
    &:focus {
      border-color: #a78bfa;
    }
    &:active {
      border-color: #a78bfa;
    }
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 1.5px;
  border-style: solid;
  border-color: #8b5cf6;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #ffffff;
  &:hover {
    background-color: #9987ff;
  }
  &:focus {
    background-color: #9987ff;
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media (min-width: 768px) {
    width: auto;
  }
  &.dark {
    border-color: #a78bfa;
    background-color: #6d28d9;
    color: #f3f4f6;
    &:hover {
      background-color: #1e293b;
    }
  }
`;

const StyledDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 0.375rem;
  border-width: 2px;
  border-style: solid;
  border-color: #1e293b;
  @media (min-width: 1024px) {
    width: 50%;
  }
  &.dark {
    border-color: #64748b;
    padding: 1px;
  }
`;


const AttendanceStudent = () => {
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // fetching Attendance
  const fetchAttendance = async (e) => {
    e.preventDefault();
    setAttendance([]);
    setError("");
    try {
      const response = await axios.get(
        `/attendance/student/${user._id}/${date}`
      );
      setAttendance(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="attendance">
      <Title>
        Attendance
      </Title>
      <section className="attendance__head">
        <StyledForm>
          <div className="flex w-fit flex-col">
            <label className="m-1" htmlFor="date">
              Select Date
            </label>
            <StyledInput
              id="date"
              placeholder="Select Date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <StyledButton
              type="submit"
              onClick={(e) => fetchAttendance(e)}
            >
              <TbDeviceDesktopSearch/> Search
            </StyledButton>
          </div>
        </StyledForm>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="attendance__form">
        <form className="w-full">
          {attendance?.length ? (
            <StyledDiv>
              <table className="w-full text-center">
                <TableHeader Headers={["Hour", "Paper", "Present"]} />
                <tbody>
                  {attendance?.map((period, index) => (
                    <tr
                      key={index}
                      className={
                        period.attendance.present
                          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
                          : "border-t-[1px] border-slate-400"
                      }
                    >
                      <td className="p-2">{period.hour}</td>
                      <td className="whitespace-break-spaces p-2">
                        {period.paper.paper}
                      </td>
                      <td className="p-2">
                        {period.attendance.present ? "Present" : "Absent"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledDiv>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
};
export default AttendanceStudent;
