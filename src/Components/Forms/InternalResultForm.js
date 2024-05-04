import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

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

const MainForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;
  accent-color: #6d28d9;
  @media (min-width: 768px) {
    flex-wrap: wrap;
  }
`;

const PaperSelect = styled.select`
  margin-bottom: 1rem;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.5px solid #a1a1aa;
  padding: 0.25rem 0.5rem;
  outline: none;
  appearance: none;
  &:focus {
    border-color: #00d0a3;
  }
  &.dark {
    border-color: #e5e5e5;
    caret-color: inherit;
    &:focus {
      border-color: #7c3aed;
    }
    &:active {
      border-color: #7c3aed;
    }
  }
  @media (min-width: 768px) {
    width: 33.333333%;
  }
`;

const SubmitButton = styled.button`
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

const InternalTableWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  overflow-x: auto;
  border-radius: 0.375rem;
  border: 2px solid #1f2937;
  .dark & {
    border-color: #334155;
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
  margin-left: 45%;
  &:hover {
    background-color: #55e5c8;
  }
  &.dark &:hover {
    background-color: #1e293b;
  }
`;

const InternalResultForm = () => {
  const { paperList } = useContext(UserContext);
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");

  const fetchInternal = async (e) => {
    setInternal([]);
    setError("");
    e.preventDefault();
    try {
      // fetching internal record
      const response = await axios.get("/internal/" + paper);
      // saving record id for updating/deleting record
      setId(response.data._id);
      setInternal(response.data.marks);
      setDisabled(true);
      setError("");
    } catch (err) {
      setError(err);
      // incase no record exists
      if (err.response.status === 404) {
        // fetching students list and mapping to add fields
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, {
            test: 0,
            seminar: 0,
            assignment: 0,
            attendance: 0,
            total: 0,
          });
        });
        setInternal(students);
        setDisabled(false);
      }
    }
  };

  const addInternalMark = async (e) => {
    e.preventDefault();
    const marks = { id, paper, marks: internal };
    try {
      // adding new internal mark record
      const response = await axios.post("internal/" + paper, marks);
      toast.success(response.data.message);
      setDisabled(true);
      setError("");
      fetchInternal(e);
    } catch (err) {
      // conflict, record already exists
      if (err.response.status === 409) {
        try {
          // updating internal record
          const response = await axios.patch("internal/" + paper, marks);
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  const deleteInternalMark = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("internal/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setInternal([]);
    } catch (err) {
      setError(err);
    }
  };

  // updating internal state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it works.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const value = e.target.value;
    const key = e.target.name;
    const newStudent = internal[index];
    newStudent[key] = value;
    const newInternal = internal.map((student, index) => {
      if (index === e.target.id) {
        return newStudent;
      } else return student;
    });
    setInternal(newInternal);
  };

  return (
    <main className="internal">
      <Title>
        Internal Mark
      </Title>
      <section className="form__head">
        <MainForm>
          <PaperSelect
            placeholder="select subject"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Subject
            </option>
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </PaperSelect>
          <SubmitButton
            type="submit"
            onClick={(e) => fetchInternal(e)}
          >
            <TbDeviceDesktopSearch/> Search
          </SubmitButton>
        </MainForm>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="internal__body">
        <form className="internal__body__form group">
          {internal.length ? (
            <InternalTableWrapper>
              <table className="w-full">
                <TableHeader
                  AdditionalHeaderClasses={"first:text-left"}
                  Headers={[
                    "Student",
                    "Test",
                    "Seminar",
                    "Assignment",
                    "Attendance",
                    "Total",
                  ]}
                />
                <tbody className="">
                  {internal?.map((student, index) => (
                    <tr
                      key={index}
                      className={
                        // checking whether the student passed (total mark is above 12), bgcolor to represent it.
                        parseInt(student?.test) +
                          parseInt(student?.seminar) +
                          parseInt(student?.assignment) +
                          parseInt(student?.attendance) >
                        12
                          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
                          : "border-t-[1px] border-slate-400 first:border-none"
                      }
                    >
                      <td className="p-2 text-left">{student.name}</td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="test"
                          value={student.test}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="seminar"
                          value={student.seminar}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="assignment"
                          value={student.assignment}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled={disabled}
                          id={index}
                          name="attendance"
                          value={student.attendance}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          className="w-full pl-3 "
                          type="number"
                          required
                          min="0"
                          max="5"
                          disabled
                          id={index}
                          name="total"
                          value={
                            parseInt(student?.test) +
                            parseInt(student?.seminar) +
                            parseInt(student?.assignment) +
                            parseInt(student?.attendance)
                          }
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InternalTableWrapper>
          ) : (
            ""
          )}
          {internal.length && disabled ? (
            <div className="flex gap-4">
              <EditButton
                type="submit"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </EditButton>
              <DeleteButton
                type="submit"
                onClick={(e) => deleteInternalMark(e)}
              >
                <FaTrash /> Delete
              </DeleteButton>
            </div>
          ) : (
            ""
          )}
          {internal.length && !disabled ? (
            <SaveButton
              type="submit"
              onClick={(e) => addInternalMark(e)}
            >
              <FaPlus /> Save
            </SaveButton>
          ) : (
            ""
          )}
          <p className="text-balance m-2 overflow-hidden text-ellipsis whitespace-break-spaces rounded bg-red-300/50 p-1 text-center font-medium text-red-700 dark:bg-transparent group-invalid:block hidden">invalid Data</p>
        </form>
      </section>
    </main>
  );
};

export default InternalResultForm;
