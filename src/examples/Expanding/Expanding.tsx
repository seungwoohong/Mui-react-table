import React, { useEffect } from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Pagination as MuiPagination,
  LinearProgress,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useExpanded,
  usePagination,
  Column,
  UsePaginationInstanceProps,
  UseTableInstanceProps,
  UseRowSelectInstanceProps,
  UseExpandedInstanceProps,
} from "react-table";
import { Box } from "@material-ui/core";
import { MoreHoriz, Note } from "@material-ui/icons";

import { Checkbox } from "../../components/Cell";

export type Row = {
  id: number;
  name: string;
  age: number;
  gender: string;
  major: string;
};

type TableInstanceProps = UsePaginationInstanceProps<Row> &
  UseTableInstanceProps<Row> &
  UseRowSelectInstanceProps<Row> &
  UseExpandedInstanceProps<Row>;

export type ExpandingProps = {
  columns: Column<Row>[];
  data: Row[];
  isLoading?: boolean;
  onSelect?: (selectedIds: number[]) => void;
  onSort?: () => void;
};

function Expanding({
  isLoading = false,
  onSelect,
  data,
  columns,
  onSort,
}: ExpandingProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    /**
     * @todo type definition for selection
     */
    // @ts-ignore
    state: { selectedRowIds, pageSize },
  } = (useTable<Row>(
    {
      columns,
      data,
      initialState: {
        // @ts-ignore
        pageSize: 10,
      },
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "expander",
          Header: "",
          // @ts-ignore
          Cell: ({ row }) =>
            row.canExpand && (
              <Box {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? "👇" : "👉"}
              </Box>
            ),
        },
        {
          id: "selection",
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Box>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </Box>
          ),
          // @ts-ignore
          Cell: ({ row }) => {
            const { onChange, selectProps } = row.getToggleRowSelectedProps();

            return (
              <Box>
                <Checkbox
                  onChange={(e) => {
                    onChange(e);
                    console.log(row);
                  }}
                  {...selectProps}
                />
              </Box>
            );
          },
        },
        ...columns,
        {
          id: "actions",
          Header: <MoreHoriz />,
          // @ts-ignore
          Cell: ({ row }) => (
            <Box>
              <IconButton
                onClick={() => {
                  alert(row.id);
                }}
              >
                <Note />
              </IconButton>
            </Box>
          ),
        },
      ]);
    }
  ) as unknown) as TableInstanceProps; // FIXME: type definition

  useEffect(() => {
    onSelect?.(selectedRowIds);
  }, [selectedRowIds]);

  return (
    <>
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
          {page.map((row) => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <MuiPagination
          count={pageCount}
          sx={{ mr: 2 }}
          onChange={(_, pageNumber) => gotoPage(pageNumber - 1)}
        />
        <Select
          value={pageSize}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) : 10;

            setPageSize(page);
            gotoPage(0);
          }}
        >
          {[10, 20, 50, 100, 200, 500].map((pageSizeOption) => (
            <MenuItem value={pageSizeOption}>{pageSizeOption}</MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
}

export default React.memo(Expanding, function (prev, next) {
  return prev === next;
});
