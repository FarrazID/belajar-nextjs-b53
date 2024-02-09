import { useCallback, useState } from "react";

//! --- Tugas H14: Create new Custom-Hooks for Data Fetching ---
// -- Write a function that uses existing 'React hooks' (useState, useCallback) 
// -- and encapsulates the logic you want to reuse. 
// -- The function should start with the word "use" (as convention)

//TODO: custom-hook: 'useMutation' -- to call API specifically that will 'change data';
// -- create (POST), update (PATCH), delete data (DELETE)
export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const mutate = useCallback(
    async ({ url = "", method = "POST", payload = {} } = {}) => {
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();

        setData({
          ...data,
          data: result,
          isLoading: false,
        });
        return { ...result };

      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
        return error;
      }
    },
    []
  );

  return { ...data, mutate };
};
