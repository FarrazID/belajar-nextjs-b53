import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";

// import fetcher from "@/utils/fetcher";
// import useSWR from "swr";  //TODO: Tugas H15 (2) -- 'fetcher' + 'useSWR' is deprecated 
//? -- replaced with 'useQueriesSWR'

//! Tugas H15 (2): to make SWR reuseable -- we use 'useQueriesSWR'
//? -- it's a custom hook (just like 'useQueries'), but using SWR
import { useQueriesSWR } from "@/hooks/useQueriesSWR";

import dynamic from "next/dynamic";
// import Link from "next/link";

import {
  Box, Flex, Grid, GridItem, Card, CardBody,
  CardHeader, CardFooter, Heading, Text, Button, Spinner
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


const LayoutComponent = dynamic(() => import('@/layout'));

//! --------- TUGAS: H11 - Data Fetching (1) -------------

//! --------- TUGAS: H12 - REST API + CRUD ( Read + Create) -------------
export default function Notes() {
  const router = useRouter();
  // const [notes, setNotes] = useState([]);

  //! --------- TUGAS: H14 - call API using Custom Hooks -------------
  //TODO: custom-hook: useMutation -- to call API specifically that will 'change data';
  // -- create, update, delete data
  const { mutate } = useMutation();

  //TODO: custom-hook: useQueries -- to call API with default method 'GET'
  //? if we use some variable  (hook) -- coz it has same 'return variables' (via object {...}) 
  //? -- it can conflict, as sample below;
  // const { data, isError, isLoading } = useQueries('/api/notes');
  // const { data, isError, isLoading } = useQueries('api/posts');
  // const { data, isError, isLoading } = useQueries('api/...');

  //TODO: to avoid conflict > retun var (data) -- 'assigned' to new var (listNotes) -- by using `:`
  // const { data: listNotes, isError: listErrorGetNotes, isLoading } = useQueries('/api/notes');

  //TODO: custom-hook: useQueries -- is disabled -> replaced by useSWR (tugas H15)
  // const { data: listNotes } = useQueries({
  //   // prefixUrl: `${process.env.NEXT_PUBLIC_URL_API}/api/notes`,  // -> check @ materi H14 -- using .env
  //   prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
  // });

  // console.log('list notes =>', listNotes);
  //? it's look like call API twice (2x) -- coz it still use hook: useEffect in development mode
  //? after we build project & deploy to server - it will only call once (1x)

  //! --------- TUGAS: H15 - Client Side Data Fetching -- using SWR -------------
  //TODO: useSWR 1) create function: 'fetcher'-- as wrapper of native 'fetch' 
  // -- u can replace 'fetch' with 'axios'
  // const fetcher = (...args) => fetch(...args).then(res => res.json());  
  //TODO: Tugas H15 (2) -- 'fetcher' + 'useSWR' is deprecated  -- replaced with 'useQueriesSWR'

  //TODO: useSWR 2) import & use 'useSWR' inside function component 'Notes'
  // const { data: listNotes, error, isLoading } =
  //   useSWR('https://paace-f178cafcae7b.nevacloud.io/api/notes', fetcher, {
  //     revalidateOnFocus: false,
  //     refreshInterval: 0,
  //   });

  //! step useSWR 2) -- replaced by custom hook: useQueriesSWR
  //TODO: useSWR 3) import & use 'useQueriesSWR' inside function component 'Notes'
  const { data: listNotes, error, isLoading } = useQueriesSWR({ prefixUrl: 'https://paace-f178cafcae7b.nevacloud.io/api/notes' },);

  // console.log('data =>', data);
  console.log('list notes =>', listNotes);
  console.log('error =>', error);
  console.log('isLoading =>', isLoading);

  //! --------- TUGAS: H13 - REST API + CRUD ( Edit + Delete) -------------
  const HandleDelete = async (id) => {
    //! -- from Tugas H13 --
    // try {
    //   const response = await fetch(
    //     `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   const result = await response.json();
    //   console.log("result =>", result);

    //   if (result?.success) {
    //     router.reload();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    //! -- from Tugas H14 --
    //TODO: replace (try ...catch) -- with Custom Hook; useMutation()
    const response = await mutate({
      // url: `${process.env.NEXT_PUBLIC_URL_API}/api/notes/delete/${id}`, 
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
      method: "DELETE",
    });
    if (response?.success) {
      router.reload();
    }
  };

  //! --------- until TUGAS: H13 - we still use react-Hook (useEffect) here -------------
  //? after using Custom Hook -- we don't use react-Hook (useEffect) here 
  //? -- it's moved to hook/useQueries.js 

  //TODO: 4) TEST: display data (from API) -- in browser
  // console.log('notes data =>', notes);

  //TODO: 5) define styles for data fetched -- using library: Chakra UI
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {/* //! using style component <Box> -- as container*/}
        <Box padding="5">

          {/* //TODO: 7) Button: Add Notes */}
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add Notes
            </Button>
          </Flex>

          {/* //TODO: 6) Grid: Notes -- with button: Edit & Delete */}
          <Flex>
            <Grid templateColumns='repeat(3, 1fr)' gap={5}>
              {
                // notes?.data?.map((item) => (
                listNotes?.data?.map((item) => (
                  <GridItem key={item.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>

                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>

                      <CardFooter justify='space-between' flexWrap='wrap'>
                        <Button onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1" colorScheme="purple" >
                          Edit
                        </Button>

                        <Button
                          onClick={() => HandleDelete(item?.id)}
                          flex='1' colorScheme="red" >
                          Delete
                        </Button>

                      </CardFooter>

                    </Card>
                  </GridItem>
                ))
              }
            </Grid>
          </Flex>

        </Box>
      </LayoutComponent>
    </>
  )
};


