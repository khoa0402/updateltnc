import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

const AddSubjectTitle = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
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

const AddPaperForm = styled.form`
  width: 50%;
  font-weight: 600;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.5px solid #a1a1aa;
  padding: 0.25rem 0.5rem;
  outline: none;
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
`;

const FormSelect = styled.select`
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
`;

const AddButton = styled.button`
  margin-left: 40%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 1.5px solid #000000;
  background-color: #1f2937;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  color: #ffffff;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #55e5c8;
  }
  &.dark {
    border-color: #7c3aed;
    background-color: #7c3aed;
    &:hover {
      background-color: #1e293b;
    }
  }
`;


const PaperForm = () => {
  const { user } = useContext(UserContext);
  const [newPaper, setNewPaper] = useState({
    department: user.department,
    paper: "",
    year: "2023",
    students: [],
    semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch staffs
  useEffect(() => {
    const getTeachers = async () => {
      const list = await axios.get("/staff/list/" + user.department);
      setTeachers(list.data);
    };
    getTeachers();
  }, [user]);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("paper", JSON.stringify(newPaper));
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setNewPaper({
      ...newPaper,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="paper">
          <AddSubjectTitle>
            Add Subject
          </AddSubjectTitle>
          <AddPaperForm>
            <label htmlFor="department">Department:</label>
            <FormInput
              name="department"
              type="text"
              required
              id="department"
              value={newPaper.department}
              disabled
            />
            <label htmlFor="paper">Paper:</label>
            <FormInput
              type="text"
              name="paper"
              id="paper"
              value={newPaper.paper}
              required
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="semester">Semester:</label>
            <FormSelect
              id="semester"
              value={newPaper.semester}
              required
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Semester
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
            </FormSelect>
            <label htmlFor="year">Year:</label>
            <FormInput
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={newPaper.year}
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="teacher">Teacher:</label>
            <FormSelect
              required
              id="teacher"
              name="teacher"
              value={newPaper.teacher}
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </FormSelect>
            <AddButton
              type="submit"
              onClick={(e) => addPaper(e)}
            >
              <FaPlus />
              Add
            </AddButton>
          </AddPaperForm>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default PaperForm;
