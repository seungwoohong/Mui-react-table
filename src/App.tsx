import React, { useMemo, useEffect } from "react";
import "./App.css";
import Expading, { ExpandingProps } from "./examples/Expanding/Expanding";
import useMock from "./hooks/useMock";

function App() {
  const { action, data: mockData } = useMock();

  useEffect(() => {
    action();
  }, []);

  const columns: ExpandingProps["columns"] = useMemo(
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

  const data = useMemo(
    () => mockData.map((v) => ({ ...v, subRows: [{ ...v, subRows: [v] }, v] })),
    [mockData]
  );

  return <Expading columns={columns} data={data} />;
}

export default App;
