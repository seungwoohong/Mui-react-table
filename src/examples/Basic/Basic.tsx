import React, { useMemo } from "react";
import { useTable } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const Basic = () => {
  const columns = useMemo(
    // coulumns must be materialized
    () => [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "age",
        accessor: "age",
      },
      {
        Header: "gender",
        accessor: "gender",
      },
      {
        Header: "major",
        accessor: "major",
      },
    ],
    []
  );

  const row = {
    name: "Seungwoo Hong",
    age: 30,
    gender: "male",
    major: "computer software",
  };

  const data = useMemo(() => Array(100).fill(row), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
  } = useTable({
    columns,
    data,
  });

  return (
    <MaUTable {...getTableProps}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((header) => (
              <TableCell {...header.getHeaderProps()}>
                {header.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

export default Basic;
