import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader, RowWithCheckbox } from "../Table";
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

const StyledSelect = styled.select`
  margin-bottom: 1rem;
  display: block;
  height: 2.5rem;
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
    border-color: #00d0a3;
  }
  &.dark {
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
    border-color: #00d0a3;
  }
  &.dark {
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

const StyledSelection = styled.select`
  margin-bottom: 1rem;
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
    border-color: #00d0a3;
  }
  &.dark {
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

const EditButton = styled.button`
  margin-left: 40%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 1.5px solid #000000;
  background-color: #000000;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  color: #ffffff;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #9987ff;
  }
  &.dark {
    border-color: #7c3aed;
    background-color: #7c3aed;
    &:hover {
      background-color: #1e293b;
    }
  }
`;

const DeleteButton = styled(EditButton)`
  margin-left: 0;
  &:hover {
    background-color: #dc2626;
  }
  &.dark &:hover {
    background-color: #dc2626;
  }
`;

const SaveButton = styled(EditButton)`
  margin-left:
  &:hover {
    background-color: #55e5c8;
  }
  &.dark &:hover {
    background-color: #1e293b;
  }
`;

const Attendance = () => {
  const { paperList } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [paper, setPaper] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");

  // fetching Attendance
  const fetchAttendance = async (e) => {
    setAttendance([]);
    setError("");
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`/attendance/${paper}/${date}/${hour}`);
      // saving the record ID for Updating/Deleting record
      setId(response.data._id);
      setAttendance(response.data.attendance);
      setDisabled(true);
    } catch (err) {
      setError(err);
      // in case no attendance record exists
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        // students list is fetched and mapped to add "present" value
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, { present: true });
        });
        setAttendance(students);
        setDisabled(false);
      }
    }
  };

  // adding new attendance and updating existing attendance record
  const addAttendance = async (e) => {
    e.preventDefault();
    // removing student names from data since only studentId is stored in database
    const newData = attendance.map((i) => {
      return { student: i._id, present: i.present };
    });
    try {
      // adding a new attendance record
      const response = await axios.post(
        `/attendance/${paper}/${date}/${hour}`,
        { paper, date, hour, attendance: newData }
      );
      toast.success(response.data.message);
      setDisabled(true);
      setError("");
      fetchAttendance(e);
    } catch (err) {
      // conflict, attendance record already exists
      if (err?.response.status === 409) {
        const newData = attendance.map((i) => {
          return { student: i.student._id, present: i.present };
        });
        try {
          // updating the old attendance record
          const response = await axios.patch(
            `/attendance/${paper}/${date}/${hour}`,
            { id, paper, date, hour, attendance: newData }
          );
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
          fetchAttendance(e);
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  const deleteAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("attendance/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setAttendance([]);
    } catch (err) {
      setError(err);
    }
  };

  // updating attendance state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it works.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const newStudent = attendance[index];
    newStudent.present = !newStudent.present;
    const newAttendance = attendance.map((student, index) => {
      if (index === parseInt(e.target.id)) return student;
      else return student;
    });
    setAttendance(newAttendance);
  };

  return (
    <main className="attendance">
      <Title>
        Attendance
      </Title>
      <section className="attendance__head">
        <StyledForm>
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="paper">
              Select Subject
            </label>
            <StyledSelect
              name="paper"
              id="paper"
              value={paper}
              required
              onChange={(e) => setPaper(e.target.value)}
            >
              <option defaultValue hidden>
                ---
              </option>
              {paperList.map((paper, index) => (
                <option key={index} value={paper._id}>
                  {paper.paper}
                </option>
              ))}
            </StyledSelect>
          </div>
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="date">
              Select Date
            </label>
            <StyledInput
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="m-1" htmlFor="hour">
              Select Hour
            </label>

            <StyledSelection
              name="hour"
              id="hour"
              value={hour}
              required
              onChange={(e) => setHour(e.target.value)}
            >
              <option defaultValue hidden>
                ---
              </option>
              <option value="1">7:00-9:00</option>
              <option value="2">9:00-11:00</option>
              <option value="3">11:00-13:00</option>
              <option value="4">13:00-15:00</option>
              <option value="5">15:00-17:00</option>
            </StyledSelection>
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
              <table className="w-full">
                <TableHeader Headers={["Present", "Student"]} />
                <tbody>
                  {attendance?.map((student, index) => (
                    <RowWithCheckbox
                      key={index}
                      keys={index}
                      disabled={disabled}
                      value={student}
                      handleFormChange={handleFormChange}
                    />
                  ))}
                </tbody>
              </table>
            </StyledDiv>
          ) : (
            ""
          )}
          {attendance.length && disabled ? (
            <div className="flex gap-4">
              <EditButton
                type="submit"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </EditButton>
              <DeleteButton
                type="submit"
                onClick={(e) => deleteAttendance(e)}
              >
                <FaTrash /> Delete
              </DeleteButton>
            </div>
          ) : (
            ""
          )}
          {attendance?.length && !disabled ? (
            <SaveButton
              type="submit"
              onClick={(e) => addAttendance(e)}
            >
              <FaPlus /> Save
            </SaveButton>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
};
export default Attendance;
