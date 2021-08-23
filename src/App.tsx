import React, { useMemo, useEffect } from "react";
import "./App.css";
import Pagination, { PaginationProps } from "./examples/Pagination/Pagination";
import useMock from "./hooks/useMock";

function App() {
  const { action, data: mockData } = useMock();

  useEffect(() => {
    action();
  }, []);

  const columns: PaginationProps["columns"] = useMemo(
    // coulumns must be materialized
    () => [
      {
        Header: "Index",
        accessor: "id",
      },
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

  const data = useMemo(() => mockData, [mockData]);

  return <Pagination columns={columns} data={data} />;
}

export default App;
