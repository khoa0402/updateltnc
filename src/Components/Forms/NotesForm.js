import { useContext, useEffect, useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

const NotesTitle = styled.h2`
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 0.75rem;
  font-size: 4.5rem;
  font-weight: bold;
  color: #cf6684;
  &.dark {
    margin-top: 0;
    color: #e5e5e5;
  }
`;

const NoteFormTitle = styled.h3`
  color: #000000;
  font-size: 1.5rem;
  font-weight: 600;
`;

const NoteFormLabel = styled.label`
  color: #ff6600;
  display: block;
  font-size: 1rem;
  font-weight: 500;
`;

const NoteInput = styled.input`
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

const NoteTextArea = styled.textarea`
  margin-bottom: 1rem;
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

const UpdateButton = styled.button`
  margin-left: 45%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border: 1.5px solid #000000;
  background-color: #000000;
  padding: 0.5rem 1rem;
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

const AddButton = styled(UpdateButton)`
  &:hover {
    background-color: #55e5c8;
  }
  &.dark &:hover {
    background-color: #1e293b;
  }
`;


const NotesForm = () => {
  const { paper, notes } = useContext(UserContext);
  const [note, setNote] = useState({
    paper: paper._id,
    title: "",
    body: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const noteId = useParams()?.note;

  useEffect(() => {
    if (noteId) {
      setNote(notes[noteId]);
    }
  }, [noteId, notes]);

  const handleFormChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,
    });
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("notes/paper/" + paper._id, note);
      setError("");
      navigate(-1, { replace: true });
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("notes/" + note._id, note);
      navigate(-1, { replace: true });
      setError("");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="notes">
      <NotesTitle>
        {paper?.paper}
      </NotesTitle>
      <NoteFormTitle>
        {noteId !== undefined ? "Edit Note" : "Add New Note"}
      </NoteFormTitle>
      <form>
        <NoteFormLabel htmlFor="title">
          Title:
        </NoteFormLabel>
        <NoteInput
          type="text"
          id="title"
          required
          value={note?.title}
          onChange={(e) => handleFormChange(e)}
        />
        <NoteFormLabel htmlFor="body" >
          Body:
        </NoteFormLabel>
        <NoteTextArea
          rows="12"
          type="text"
          id="body"
          required
          value={note?.body}
          onChange={(e) => handleFormChange(e)}
        />
        {noteId !== undefined ? (
          <UpdateButton
            type="submit"
            onClick={(e) => updateNote(e)}
          >
            <RxUpdate />
            Update Note
          </UpdateButton>
        ) : (
          <AddButton
            type="submit"
            onClick={(e) => addNote(e)}
          >
            <FaPlus />
            Add Note
          </AddButton>
        )}
      </form>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default NotesForm;
