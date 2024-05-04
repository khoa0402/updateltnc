import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

const SectionTitle = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 0.75rem;
  white-space: break-spaces;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #cf6684;
  &.dark {
    margin-top: 0;
    color: #e2e8f0;
  }
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const PaperTitle = styled.p`
  font-size: 1.5rem;   
  font-weight: bold;
`;

const StuList = styled.ol`
  background-color: #71ae75;
  margin-top: 0.5rem;   
  padding-left: 2rem;   
  font-size: 1.125rem;   
  font-weight: 500;   
  list-style-type: decimal;
`;

const StudentsList = () => {
  const { paper } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudentsList = async (e) => {
      try {
        const response = await axios.get("/paper/students/" + paper._id);
        setStudents(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getStudentsList();
  }, [paper]);
  return (
    <main className="student">
      <SectionTitle>
        Students List
      </SectionTitle>
      <PaperTitle>Subject: {paper.paper}</PaperTitle>
      {students.length ? (
        <StuList>
          {students?.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </StuList>
      ) : (
        ""
      )}
      {!students.length && !error && <Loading />}
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
    </main>
  );
};

export default StudentsList;
