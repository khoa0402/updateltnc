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

const FormSelect = styled.select`
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
      border-color: #8b5cf6;
    }
  }
`;

const OptionItem = styled.option`
  min-height: 2rem;
  background-color: #bf92f5;
  font-weight: 600;
  line-height: 2rem;
  color: #f1f5f9;
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

// Staff Registration Form
const StaffForm = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  //TODO Add more departments
  const addStaff = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(staff);
      const response = await axios.post("staff/ ", reqData);
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
        name="name"
        required
        id="name"
        value={staff.name}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="email">
        Email:
      </label>
      <FormInput
        type="text"
        required
        id="email"
        name="email"
        value={staff.email}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="department">
        Department:
      </label>
      <FormSelect
        placeholder="select department"
        name="department"
        id="department"
        value={staff.department}
        required
        onChange={(e) => handleFormChange(e)}
      >
        <option defaultValue hidden>
          Select Department
        </option>

        <OptionItem value="Computer"
        >
          Computer
        </OptionItem>
      </FormSelect>
      <label className="block" htmlFor="username">
        Username:
      </label>
      <FormInput
        name="username"
        type="text"
        required
        id="username"
        value={staff.username}
        onChange={(e) => handleFormChange(e)}
      />
      <label className="block" htmlFor="password">
        Password:
      </label>
      <FormInput
        type="password"
        name="password"
        id="password"
        value={staff.password}
        required
        onChange={(e) => handleFormChange(e)}
      />
      <FormButton
        type="submit"
        onClick={(e) => addStaff(e)}
      >
        Submit
      </FormButton>
      {error ? <ErrorStrip error={error} /> : ""}
    </FormWrapper>
  );
};

export default StaffForm;
