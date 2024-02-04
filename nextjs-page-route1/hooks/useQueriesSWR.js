// import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

//TODO: 1) define custom hook 'useQueries' using SWR
export const useQueriesSWR = ({ prefixUrl = "" } = {}) => {

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } =
    useSWR(prefixUrl, fetcher, {
      // revalidateOnFocus: false,
      // refreshInterval: 3000,
    });


  //! Tugas H15 -- when using SWR, we don't need 'useEffect' anymore
  // useEffect(() => {
  //   if (prefixUrl) {
  //     fetchingData({ url: prefixUrl });
  //   }
  // }, []);

  return { data: data || null, error: error || false, isLoading };
  //TODO: define validation for return value
  //? if data.value exist -- it will return 'data'
  //? if data.value is null -- it will return 'null' instead of 'undefined'
};
