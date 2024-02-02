import { useCallback, useEffect, useState } from "react";

//TODO: 1) define custom hook 'useQueries'
export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true, //true: call API still running, false: call finished
    isError: false,
  });

  //TODO: 2) define funtion to fetch data
  const fetchingData = useCallback(
    async ({ url = "", method = "GET" } = {}) => {
      try {
        const response = await fetch(url, { method });
        const result = await response.json();

        setData({
          ...data,
          data: result,
          isLoading: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
      }
    },
    []
  );

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl });
    }
  }, []);

  return { ...data };
};
