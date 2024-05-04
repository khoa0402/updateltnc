import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
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

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  font-weight: 600;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4rem;
  }
`;

const StyledLink = styled(Link)`
  border-radius: 0.375rem;
  padding: 0.5rem 0.5rem;
  text-decoration: underline;
  text-decoration-color: #8b5cf6;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.5rem;
  &:hover {
    background-color: #1e293b;
    color: #f1f5f9;
    text-decoration: none;
  }
  @media (min-width: 768px) {
    padding: 0.5rem 0.5rem;
  }
  &.dark {
    text-decoration-color: inherit;
    &:hover {
      background-color: #a78bfa;
      color: #f3f4f6;
    }
  }
`;

const StyledArticle = styled.article`
  margin-top: 1rem;
  overflow: auto;
  white-space: break-spaces;
  border-radius: 0.375rem;
  background-color: #d8b4fe;
  transition-property: background-color;
  transition-duration: 300ms;
  &:hover {
    background-color: rgba(168, 139, 253, 0.6);
  }
  &.dark {
    background-color: rgba(51, 65, 85, 0.7);
    color: #e2e8f0;
    &:hover {
      background-color: #1e293b;
    }
  }
`;

const StyledEditIcon = styled(FaEdit)`
  margin-left: 0.5rem;
  transition-property: background-color, color;
  transition-duration: 200ms;
  border-radius: 0.375rem;
  padding: 0.25rem 0.25rem;
  font-size: 1.875rem;
  &:hover {
    background-color: #51c26f;
    color: #f1f5f9;
  }
  @media (min-width: 1024px) {
    padding: 0.5rem 0.5rem;
    font-size: 2.25rem;
  }
  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: #a78bfa;
    }
  }
`;

const StyledTrashIcon = styled(FaTrash)`
  margin-left: 0.5rem;
  transition-property: background-color, color;
  transition-duration: 200ms;
  border-radius: 0.375rem;
  padding: 0.25rem 0.25rem;
  font-size: 1.875rem;
  color: #dc143c;
  &:hover {
    background-color: #dc143c;
    color: #f1f5f9;
  }
  @media (min-width: 1024px) {
    padding: 0.5rem 0.5rem;
    font-size: 2.25rem;
  }
  @media (prefers-color-scheme: dark) {
    color: #ff6347;
    &:hover {
      background-color: #ff6347;
    }
  }
`;

const StyledHr = styled.hr`
  border-bottom-width: 1.5px;
  border-bottom-style: solid;
  border-bottom-color: #8b5cf6;
  &.dark {
    border-bottom-color: #64748b;
  }
`;

const StyledPre = styled.pre`
  white-space: pre-wrap;
  padding: 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`;


const Notes = () => {
  const { paper, notes, setNotes, user } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("notes/paper/" + paper._id);
        setNotes(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
    return () => setNotes([]);
  }, [paper, setNotes]);

  const deleteNote = async (e) => {
    const id = e.currentTarget.id;
    const response = await axios.delete("notes/" + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    toast.success(response.data.message, {
      icon: () => <FaTrash />,
    });
  };

  return (
    <main>
      <Title>
        {paper.paper}
      </Title>
      <StyledList>
        <li className="p-1">Batch : {paper.year}</li>
        <li className="p-1">Semester : {paper.semester}</li>
        {user.userType === "student" && (
          <li className="p-1">Teacher : {paper.teacher.name}</li>
        )}
        <li>
          <StyledLink
            to="students"
          >
            Students
          </StyledLink>
        </li>
        {user.userType === "staff" && (
          <li>
            <StyledLink
              to="add"
            >
              Add Note
            </StyledLink>
          </li>
        )}
      </StyledList>

      <hr className="mt-3 border-b-[1px] border-slate-500 " />

      <section className="note__body w-full ">
        {notes?.map((note, index) => (
          <StyledArticle
            key={index}
          >
            <details className="duration-200">
              <summary className="list-none duration-200">
                <div className="flex justify-between">
                  <h3 className="p-4 text-lg  font-semibold">{note.title}</h3>
                  {user.userType === "staff" && (
                    <div className="flex p-3 pb-1">
                      <Link to={`${index}/edit`} id={index}>
                        <StyledEditIcon />
                      </Link>
                      <Link
                        id={note._id}
                        style={{ color: "rgba(220, 20, 60, 0.8)" }}
                        onClick={(e) => deleteNote(e)}
                      >
                        <StyledTrashIcon />
                      </Link>
                    </div>
                  )}
                </div>
              </summary>
              <StyledHr />
              <StyledPre>
                {note.body}
              </StyledPre>
            </details>
          </StyledArticle>
        ))}
        {!notes.length && !error ? <Loading /> : ""}
      </section>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default Notes;
