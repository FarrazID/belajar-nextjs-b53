import dynamic from "next/dynamic";
// import Link from "next/link";

import {
  Box, Flex, Grid, GridItem, Card, CardBody,
  CardHeader, CardFooter, Heading, Text, Button, Spinner
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


//! Using dynamic import (as new wrapper: 'LayoutComponent')
const LayoutComponent = dynamic(() => import('@/layout'));
// use dynamic() to import 'Layout Component' inside (folder) layout

//! --------- TUGAS: H11 - Data Fetching (1) -------------


//! --------- TUGAS: H12 - REST API + CRUD ( Read + Create) -------------
export default function Notes() {
  //TODO: 8) define hook -- 'useRouter()' -- route to page: Add
  const router = useRouter();

  //TODO: 2) define hook -- 'useState()' -- to save the data fetched 
  //-- from 'listNotes' -- to setNotes(listNotes); --> step: 3
  const [notes, setNotes] = useState([]);

  //TODO: 1) call API -- via 'useEffect()' <-- client side data fetching
  useEffect(() => {
    async function FetchingData() {
      const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
      const listNotes = await res.json();

      //TODO: 3) fill 'setNotes()' -- by data from 'listNotes'
      setNotes(listNotes);
    }
    //call function: FetchingData()
    FetchingData();
  }, []);

  //TODO: 4) TEST: display data (from API) -- in browser
  console.log('notes data =>', notes);

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
                notes?.data?.map((item) => (
                  <GridItem key={item.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>

                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>

                      <CardFooter justify='space-between' flexWrap='wrap'
                      // sx={{
                      //   '& > button': {
                      //     minW: '136px',
                      //   },
                      // }}
                      >
                        {/* <Button flex='1' variant='ghost' leftIcon={<BiLike />}> */}
                        <Button onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1" colorScheme="purple" >
                          Edit
                        </Button>
                        <Button flex='1' colorScheme="red" >
                          Delete
                        </Button>
                        {/* <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                          Share
                        </Button> */}
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


