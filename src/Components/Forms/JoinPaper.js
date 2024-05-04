import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

const ManageTitle = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 0.75rem;
  white-space: break-spaces;
  text-align: center;
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

const PaperTable = styled.div`
  background-color: #c0dfd9;
  margin-bottom: 1rem;
  width: 100%;
  overflow-x: auto;
  border-radius: 0.375rem;
  border: 2px solid #1f2937;
  &.dark {
    border-color: #334155;
    padding: 1px;
  }
`;

const PaperTableCell = styled.td`
  border-top: 1px solid #7c3aed;
  padding: 0.5rem 1rem;
  &.dark {
    border-color: #475569;
  }
`;

const PaperTableCell1 = styled.td`
  border-top: 1px solid #7c3aed;
  padding: 0;
  &.dark {
    border-color: #475569;
  }
`;

const JoinButton = styled.button`
  margin: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  padding: 0.75rem 0;
  font-size: 1rem;
  color: #000000;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #52ff47;
  }
  &.dark {
    color: #e5e5e5;
  }
`;

const LeaveButton = styled(JoinButton)`
  &:hover {
    background-color: #dc2626;
  }
`;

const JoinPaper = () => {
  const { user, setPaperList } = useContext(UserContext);
  const [error, setError] = useState("");
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const getallPapers = async () => {
      try {
        const response = await axios.get("paper/manage/" + user._id);
        setPapers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getallPapers();

    const updatePapers = async () => {
      const response = await axios.get(`paper/student/${user._id}`);
      setPaperList(response.data);
    };
    // updating paperList while component unmounts
    return () => updatePapers();
  }, [user, setPaperList]);

  const handleJoin = async (e) => {
    const paperId = e.currentTarget.id;
    const index = e.target.name;
    const students = papers[index].students;
    students.push(user._id);
    updateStudents(paperId, students, index);
  };

  const handleLeave = async (e) => {
    const paperId = e.currentTarget.id;
    const index = e.target.name;
    const students = papers[index].students;
    const updatedStudents = students.filter((student) => student !== user._id);
    updateStudents(paperId, updatedStudents, index);
  };

  const updateStudents = async (paperId, studentsObj, paperIndex) => {
    setError("");
    try {
      const response = await axios.patch("/paper/" + paperId, {
        students: studentsObj,
        id: paperId,
      });
      toast.success(response.data.message);
      const updatedPaper = papers.map((paper, index) => {
        if (index === parseInt(paperIndex)) {
          paper.joined = !paper.joined;
          return paper;
        } else return paper;
      });
      setPapers(updatedPaper);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {user.role === "student" ? (
        <main>
          <ManageTitle>
            Manage Subject
          </ManageTitle>
          <form>
            {papers.length ? (
              <>
                <PaperTable>
                  <table className="w-full text-left">
                    <TableHeader
                      AdditionalRowClasses={"rounded-t-xl text-left"}
                      AdditionalHeaderClasses={'last:text-center'}
                      Headers={[
                        "Subject",
                        "Department",
                        "Year",
                        "Semester",
                        "Teacher",
                        "Choice",
                      ]}
                    />
                    <tbody>
                      {papers?.map((paper, index) => (
                        <tr key={index}>
                          <PaperTableCell>
                            {paper.paper}
                          </PaperTableCell>
                          <PaperTableCell>
                            {paper.department}
                          </PaperTableCell>
                          <PaperTableCell>
                            {paper.year}
                          </PaperTableCell>
                          <PaperTableCell>
                            {paper.semester}
                          </PaperTableCell>
                          <PaperTableCell>
                            {paper.teacher.name}
                          </PaperTableCell>
                          <PaperTableCell1>
                            {!paper.joined ? (
                              <JoinButton
                                type="button"
                                id={paper._id}
                                name={index}
                                onClick={(e) => handleJoin(e)}
                              >
                                Join
                              </JoinButton>
                            ) : (
                              <LeaveButton
                                type="button"
                                id={paper._id}
                                name={index}
                                onClick={(e) => handleLeave(e)}
                              >
                                Leave
                              </LeaveButton>
                            )}
                          </PaperTableCell1>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </PaperTable>
              </>
            ) : (
              <Loading />
            )}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default JoinPaper;
