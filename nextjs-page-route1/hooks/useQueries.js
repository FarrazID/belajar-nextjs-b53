import { useCallback, useEffect, useState } from "react";

//! --- Tugas H14: Create new Custom-Hooks for Data Fetching ---
//TODO: custom-hook: 'useQueries' -- to call API with default method 'GET'
export const useQueries = ({ prefixUrl = "" } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true, //true: call API still running, false: call finished
    isError: false,
  });

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
