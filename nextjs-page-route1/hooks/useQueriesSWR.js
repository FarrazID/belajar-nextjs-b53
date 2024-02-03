// import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

//TODO: 1) define custom hook 'useQueries' using SWR
export const useQueriesSWR = ({ prefixUrl = "" } = {}) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data: listNotes, error, isLoading } =
    useSWR(prefixUrl, fetcher, {
      // revalidateOnFocus: false,
      // refreshInterval: 3000,
    });

  // const [data, setData] = useState({
  //   data: null,
  //   isLoading: true, //true: call API still running, false: call finished
  //   isError: false,
  // });

  //TODO: 2) define funtion to fetch data
  // const fetchingData = useCallback(
  //   async ({ url = "", method = "GET" } = {}) => {
  //     try {
  //       const response = await fetch(url, { method });
  //       const result = await response.json();

  //       setData({
  //         ...data,
  //         data: result,
  //         isLoading: false,
  //       });
  //     } catch (error) {
  //       setData({
  //         ...data,
  //         isError: true,
  //         isLoading: false,
  //       });
  //     }
  //   },
  //   []
  // );

  //! when using SWR, we don't need 'useEffect' anymore
  // useEffect(() => {
  //   if (prefixUrl) {
  //     fetchingData({ url: prefixUrl });
  //   }
  // }, []);

  return { data: datam || null, error: error || false, isLoading };
};
