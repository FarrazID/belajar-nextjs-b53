import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";

//TODO: this dependencies is used in Tugas H15
// import fetcher from "@/utils/fetcher";
// import useSWR from "swr";

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
  // const [notes, setNotes] = useState([]);  // --this variable is used in Tugas H13 -- not in H14

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

  //TODO: to avoid conflict > retun var -- assigned to new var -- by using `:`
  // const { data: listNotes, isError: listErrorGetNotes, isLoading } = useQueries('/api/notes');

  //TODO: custom-hook: useQueries -- is disabled -- replaced by useSWR
  const { data: listNotes } = useQueries({
    // prefixUrl: `${process.env.NEXT_PUBLIC_URL_API}/api/notes`,  // -> check @ materi H14 -- using .env
    prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
  });

  console.log('list notes =>', listNotes);
  //? it's look like call API twice (2x) -- coz it still use hook: useEffect in development mode
  //? after we build project & deploy to server - it will only call once (1x)

  //! --------- TUGAS: H15 - Client Side Data Fetching -- using SWR -------------
  //TODO: useSWR -- to fetch data from API -- asynchronously
  // const { data, isLoading } = useSWR('https://paace-f178cafcae7b.nevacloud.io/api/notes', fetcher);


  //! --------- TUGAS: H13 - REST API + CRUD ( Edit + Delete) -------------

  const HandleDelete = async (id) => {
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

    //! -- from Tugas H14 (Custom Hooks) --
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
  //? -- useEffect() is moved to file: hook/useQueries.js 
  //TODO: 1) call API -- via 'useEffect()' <-- client side data fetching
  // useEffect(() => {
  //   async function FetchingData() {
  //     const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  //     const listNotes = await res.json();

  //     //TODO: 3) fill 'setNotes()' -- by data from 'listNotes'
  //     setNotes(listNotes);
  //   }
  //   //call function: FetchingData()
  //   FetchingData();
  // }, []);

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
                // notes?.data?.map((item) => (  //! -- from Tugas H14 (Custom Hooks) --
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


