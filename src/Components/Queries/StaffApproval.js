import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";
import { TableHeader } from "../Table";
import styled from "styled-components";

const StaffApprovalTitle = styled.h2`
  margin-bottom: 0.5rem;
  text-align: center;
  margin-top: 0.75rem;
  white-space: break-spaces;
  font-size: 2.25rem;
  font-weight: 700;
  color: #cf6684;
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  &.dark {
    margin-top: 0;
    color: #d1d5db;
  }
`;

const TableContainer = styled.div`
  background-color: #e4baeb;
  margin-top: 1rem;
  width: 100%;
  overflow: auto;
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: #1f2937;
  .dark & {
    border-color: #475569;
    padding: 1px;
  }
`;

const ApproveButton = styled.button`
  margin: 0;
  display: flex;
  height: auto;
  width: 100%;
  justify-content: center;
  background-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  transition-duration: 200ms;
  color: #4e4da1;
  &:hover {
    color: #ffffff;
    background-color: #55e5c8;
  }
`;

const RejectButton = styled.button`
  margin: 0;
  display: flex;
  height: auto;
  width: 100%;
  justify-content: center;
  background-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  transition-duration: 200ms;
  color: #4e4da1;
  &:hover {
    color: #ffffff;
    background-color: #ef4444;
  }
`;

const StaffApproval = () => {
  const { user } = useContext(UserContext);
  const [newStaffs, setNewStaffs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewStaffs = async () => {
      try {
        const response = await axios.get("staff/approve/" + user.department);
        setNewStaffs(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNewStaffs();
  }, [user]);

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const staff = newStaffs[index];
    staff.role = "teacher";
    try {
      const response = await axios.patch("/staff/" + staff._id, {
        id: staff._id,
        role: staff.role,
      });
      newStaffs.splice(index, 1);
      toast.success(response.data.message);
      setError("");
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (e) => {
    const staff = newStaffs[e.currentTarget.id]._id;
    try {
      const response = await axios.delete("/staff/" + staff);
      newStaffs.splice(e.currentTarget.id, 1);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="staff__approval">
          <StaffApprovalTitle>
            Approve Staff
          </StaffApprovalTitle>
          <h3 className="text-2xl font-semibold">
            Department: {user.department}
          </h3>
          <form>
            {newStaffs.length ? (
              <TableContainer>
                <table className="w-full">
                  <TableHeader
                    Headers={["Name", "Email", "Username", "Approve", "Reject"]}
                    AdditionalRowClasses={"text-left"}
                    AdditionalHeaderClasses={"last:text-center secondLast"}
                  />
                  <tbody>
                    {newStaffs?.map((staff, index) => (
                      <tr key={index}>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.name}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.email}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {staff.username}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <ApproveButton
                            type="button"
                            id={index}
                            onClick={(e) => handleApprove(e)}
                          >
                            <FaPlus />
                          </ApproveButton>
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <RejectButton
                            type="button"
                            id={index}
                            onClick={(e) => handleDelete(e)}
                          >
                            <FaTrash />
                          </RejectButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableContainer>
            ) : (
              ""
            )}
            {!newStaffs.length && !error && <Loading />}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default StaffApproval;
