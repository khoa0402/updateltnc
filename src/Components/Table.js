import React from "react";
import styled from 'styled-components';

const StyledCheckbox = styled.input`
  margin-left: auto;
  margin-right: auto;
  height: 2.25rem;
  width: 2.25rem;
  padding: 1rem;
  font-size: 2rem;
  accent-color: #8b5cf6;
  &:disabled {
    cursor: not-allowed;
  }
`;

const StyledTableCell = styled.td`
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
`;

const TableHeader = ({
  AdditionalRowClasses,
  AdditionalHeaderClasses,
  Headers,
}) => {
  return (
    <thead>
      <tr
        className={`${AdditionalRowClasses} bg-slate-900 text-lg text-slate-100`}
      >
        {Headers.map((header, i) => (
          <th key={i} className={`${AdditionalHeaderClasses} p-3`}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const RowWithCheckbox = ({ keys, disabled, value, handleFormChange }) => {
  return (
    <tr
      key={keys}
      className={
        value.present
          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
          : "border-t-[1px] border-slate-400"
      }
    >
      <td className="p-2 text-center">
        <StyledCheckbox
          type="checkbox"
          required
          disabled={disabled}
          id={keys}
          checked={value.present}
          // value={student.present}
          onChange={(e) => handleFormChange(e)}
        />
      </td>
      <StyledTableCell>
        {value.student?.name || value?.name}
      </StyledTableCell>
    </tr>
  );
};

export { RowWithCheckbox, TableHeader };
