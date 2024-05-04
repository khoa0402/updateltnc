import React from "react";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
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

const CustomSection = styled.section`
  margin-top: 1rem; 
  width: 100%; 
  overflow: auto; 
  border-radius: 0.5rem; 
  border: 2px solid #4a5568; 
  dark:border: 2px solid #2d3748; 
  dark:border-width: 1px; 
`;

const InternalStudent = () => {
  const { user } = React.useContext(UserContext);
  const [internal, setInternal] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchInternal = async () => {
      try {
        const response = await axios.get("/internal/student/" + user._id);
        setInternal(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchInternal();
  }, [user]);

  return (
    <main className="internal">
      <Title>
        Internal Mark
      </Title>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      {internal.length ? (
        <CustomSection>
          <table className="w-full ">
            <TableHeader
              AdditionalHeaderClasses={"first:text-left"}
              Headers={[
                "Paper",
                "Test",
                "Seminar",
                "Assignment",
                "Attendance",
                "Total",
              ]}
            />
            <tbody className="text-left">
              {internal?.map((paper, index) => (
                <tr
                  key={index}
                  className={
                    parseInt(paper?.marks.test) +
                      parseInt(paper?.marks.seminar) +
                      parseInt(paper?.marks.assignment) +
                      parseInt(paper?.marks.attendance) >
                    7
                      ? "border-t-[1px] border-violet-500 bg-violet-900/50 first:border-none"
                      : "border-t-[1px] border-violet-500 first:border-none"
                  }
                >
                  <td className="p-2 text-left">{paper.paper.paper}</td>
                  <td className="p-2 text-center">{paper.marks.test}</td>
                  <td className="p-2 text-center">{paper.marks.seminar}</td>
                  <td className="p-2 text-center">{paper.marks.assignment}</td>
                  <td className="p-2 text-center">{paper.marks.attendance}</td>
                  <td className="p-2 text-center">
                    {paper.marks.test +
                      paper.marks.seminar +
                      paper.marks.assignment +
                      paper.marks.attendance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CustomSection>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default InternalStudent;
