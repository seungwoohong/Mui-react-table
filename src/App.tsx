import React, { useState, useCallback, useMemo, useEffect } from "react";
import "./App.css";
import Selection, { SelectionProps } from "./examples/Selection";
import useMock from "./hooks/useMock";

function App() {
  const [selected, setSelected] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const { action, loading, data: mockData } = useMock();

  useEffect(() => {
    action(sortBy !== "asc");
  }, [sortBy]);

  const handleSelect: SelectionProps["onSelect"] = useCallback(
    (selectedIds) => {
      setSelected(selectedIds);
    },
    []
  );

  const handleSort: SelectionProps["onSort"] = useCallback(() => {
    setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const columns: SelectionProps["columns"] = useMemo(
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

  const data = useMemo(() => mockData, [mockData]);

  return (
    <>
      <Selection
        isLoading={loading}
        onSelect={handleSelect}
        data={data}
        columns={columns}
        onSort={handleSort}
      />
      {JSON.stringify(selected)}
    </>
  );
}

export default App;
