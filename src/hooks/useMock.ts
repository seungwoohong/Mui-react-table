import { useState } from "react";

const row = {
  name: "Seungwoo Hong",
  age: 30,
  gender: "male",
  major: "computer software",
};

const useMock = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<typeof row>>([]);

  const getData = (desc: boolean = false) => {
    setLoading(true);

    setTimeout(() => {
      const mock = Array(100).fill(row);
      setData(desc ? mock.reverse() : mock);
      setLoading(false);
    }, 500);

    return data;
  };

  return { action: getData, loading, data };
};

export default useMock;
