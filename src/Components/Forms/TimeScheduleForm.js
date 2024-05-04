import { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import styled from 'styled-components';

const Title = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 0.75rem;
  white-space: break-spaces;
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  color: #cf6684;
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  &.dark {
    margin-top: 0;
    color: #e5e5e5;
  }
`;

const TimeScheduleTable = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  overflow-x: auto;
  border-radius: 0.375rem;
  border: 4px solid #556fff;
  &.dark {
    border-color: #334155;
    padding: 1px;
  }
`;

const Tableheader = styled.th`
  border: none;
  background-color: #55bac8;
  padding: 1rem;
  font-size: 1rem;
  text-transform: capitalize;
  color: #000000;
`;

const TableCell = styled.td`
  min-width: 180px;
  border-left: 1px solid #a1a1aa;
  border-top: 1px solid #a1a1aa;
  padding: 0.25rem;
  &:first-child {
    border-left: none;
  }
`;

const Selection = styled.select`
  height: 3rem;
  width: 100%;
  appearance: none;
  text-align: center;
  line-height: 1.5rem;
  color: #000000;
  outline: 0;
  border: 0;
  &:focus {
    border: 0;
  }
  &:disabled {
    opacity: 1;
  }
  &.dark {
    color: #d4d4d8;
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

const TimeScheduleForm = () => {
  const { user, paperList } = useContext(UserContext);
  const [timeSchedule, setTimeSchedule] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  // updating attendance state on "onChange" event.
  const handleFormChange = (e) => {
    // the whole thing is a convoluted mess, but it WORKS.
    // if you have an alternative, DM ;).
    const index = parseInt(e.target.id);
    const day = e.target.name;
    const value = e.target.value;
    const newDay = timeSchedule[day].map((val, ind) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setTimeSchedule({
      ...timeSchedule,
      [e.target.name]: newDay,
    });
  };

  useEffect(() => {
    const fetchTimeSchedule = async () => {
      try {
        // fetching time schedule record
        const response = await axios.get("time_schedule/" + user._id);
        // saving record id for updating/deleting record
        setId(response.data._id);
        delete response.data.schedule._id;
        setTimeSchedule(response.data.schedule);
      } catch (err) {
        // incase the record doesn't exist
        if (err?.response?.status === 404) {
          setDisabled(false);
          setTimeSchedule({
            monday: ["--", "--", "--", "--", "--"],
            tuesday: ["--", "--", "--", "--", "--"],
            wednesday: ["--", "--", "--", "--", "--"],
            thursday: ["--", "--", "--", "--", "--"],
            friday: ["--", "--", "--", "--", "--"],
          });
        } else setError(err);
      }
    };
    fetchTimeSchedule();
  }, [user]);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    const data = {
      user: user._id,
      schedule: timeSchedule,
    };
    try {
      // adding a new time schedule record
      const response = await axios.post("time_schedule/" + user._id, data);
      toast.success(response.data.message);
    } catch (err) {
      // conflict, record already exists
      if (err.response.status === 409) {
        // updating existing record
        const response = await axios.patch("time_schedule/" + user._id, data);
        toast.success(response.data.message);
      } else setError(err);
    } finally {
      setDisabled(true);
    }
  };

  const deleteTimeSchedule = async (e) => {
    e.preventDefault();
    const response = await axios.delete("time_schedule/" + id);
    toast.success(response.data.message, {
      icon: ({ theme, type }) => <FaTrash />,
    });
    setTimeSchedule({
      monday: ["--", "--", "--", "--", "--"],
      tuesday: ["--", "--", "--", "--", "--"],
      wednesday: ["--", "--", "--", "--", "--"],
      thursday: ["--", "--", "--", "--", "--"],
      friday: ["--", "--", "--", "--", "--"],
    });
  };

  return (
    <main className="time_schedule">
      <Title>
        Time Schedule
      </Title>
      <form>
        {timeSchedule.monday ? (
          <TimeScheduleTable>
            <table className=" w-full text-center">
              <TableHeader
                AdditionalHeaderClasses={"h-[3rem]"}
                Headers={["Lesson", "7:00-9h00", "9:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00"]}
              />
              <tbody>
                {Object.entries(timeSchedule)?.map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <Tableheader>{key}</Tableheader>
                      {value.map((day, index) => (
                        <TableCell id="table__td" key={index}>
                          <Selection
                            value={day}
                            name={key}
                            id={index}
                            disabled={disabled}
                            onChange={(e) => handleFormChange(e)}
                          >
                            <option defaultValue>--</option>
                            {paperList?.map((paper) => (
                              <option key={paper._id} value={paper.name}>
                                {paper.paper}
                              </option>
                            ))}
                          </Selection>
                        </TableCell>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TimeScheduleTable>
        ) : (
          <Loading />
        )}

        {timeSchedule.monday && disabled && (
          <div className="flex gap-4">
            <EditButton
              type="submit"
              onClick={() => setDisabled(false)}
            >
              <FaEdit /> Edit
            </EditButton>
            <DeleteButton
              type="submit"
              onClick={(e) => deleteTimeSchedule(e)}
            >
              <FaTrash /> Delete
            </DeleteButton>
          </div>
        )}
        {!disabled && (
          <SaveButton
            type="submit"
            onClick={(e) => addTimeSchedule(e)}
          >
            <FaPlus /> Save
          </SaveButton>
        )}
      </form>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default TimeScheduleForm;
