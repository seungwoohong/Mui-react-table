import React, { useEffect } from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { LinearProgress } from "@material-ui/core";
import {
  useTable,
  useRowSelect,
  useSortBy,
  TableToggleCommonProps,
  Column,
} from "react-table";
import { Box } from "@material-ui/core";

const IndeterminateCheckbox = (
  { indeterminate, ...rest }: TableToggleCommonProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const defaultRef = React.useRef<{ indeterminate?: boolean }>();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    if (!defaultRef?.current) return;

    defaultRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <Box component="input" type="checkbox" ref={resolvedRef} {...rest} />;
};

const IndeterminateCheckboxCell = React.forwardRef(IndeterminateCheckbox);

export type Row = {
  name: string;
  age: number;
  gender: string;
  major: string;
};
export type SelectionProps = {
  isLoading: boolean;
  onSelect?: (selectedIds: number[]) => void;
  onSort?: () => void;
  data: Row[];
  columns: Column<Row>[];
};

function Selection({
  isLoading = false,
  onSelect,
  data,
  columns,
  onSort,
}: SelectionProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    /**
     * @todo type definition for selection
     */
    // @ts-ignore
    state: { selectedRowIds },
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",

          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Box>
              <IndeterminateCheckboxCell {...getToggleAllRowsSelectedProps()} />
            </Box>
          ),
          // @ts-ignore
          Cell: ({ row }) => (
            <Box>
              {/** @ts-ignore */}
              <IndeterminateCheckboxCell {...row.getToggleRowSelectedProps()} />
            </Box>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    onSelect?.(selectedRowIds);
  }, [selectedRowIds]);

  return (
    <MaUTable {...getTableProps}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((header) => (
              <TableCell
                {...header.getHeaderProps()}
                onClick={() => onSort?.()}
              >
                {header.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      {isLoading && (
        <LinearProgress
          sx={{
            width: 1,
          }}
        />
      )}
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
}

export default React.memo(Selection, function (prev, next) {
  return prev === next;
});
