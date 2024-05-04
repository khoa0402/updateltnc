import { useState } from "react";
import axios from "../../config/api/axios";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorStrip from "../ErrorStrip";

const FormWrapper = styled.form`
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;
  font-medium: true;
  tracking-wide: true;
  accent-color: #7c3aed;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  display: block;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.5px solid #94a3b8;
  padding: 0.25rem 0.5rem;
  outline: none;
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
      border-color: #8b5cf6;
    }
    &:active {
      border-color: #00d0a3;
    }
  }
`;

const FormButton = styled.button`
  margin-bottom: 1rem;
  display: block;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1.5px solid #000000;
  background-color: #1f2937;
  font-weight: bold;
  tracking-wide: true;
  color: #f1f5f9;
  &:hover {
    background-color: #6bc6d0;
  }
  &:focus {
    background-color: #6bc6d0;
  }
  &.dark {
    border-color: #8b5cf6;
    background-color: #8b5cf6;
    color: #f1f5f9;
    &:hover {
      background-color: #1f2937;
    }
  }
`;

const StudentForm = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(student);
      const response = await axios.post("student", reqData);
      navigate("/");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <FormWrapper>
      <label className="block" htmlFor="name">
        Name:
      </label>
      <FormInput
        type="text"
        required
        id="name"
        value={student.name}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="email">
        Email:
      </label>
      <FormInput
        type="text"
        required
        id="email"
        value={student.email}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="course">
        Course:
      </label>
      <FormInput
        type="text"
        required
        id="course"
        value={student.course}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="username">
        Username:
      </label>
      <FormInput
        type="text"
        required
        id="username"
        value={student.username}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="password">
        Password:
      </label>
      <FormInput
        type="password"
        id="password"
        value={student.password}
        onChange={(e) => handleFormChange(e)}
        required
      />
      <FormButton
        type="submit"
        onClick={(e) => addStudent(e)}
      >
        Update
      </FormButton>
      {error ? <ErrorStrip error={error} /> : ""}
    </FormWrapper>
  );
};

export default StudentForm;
