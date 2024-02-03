// import { useMutation } from "@/hooks/useMutation";}

import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

// import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

//! --------- TUGAS: H12 - REST API + CRUD ( Read + Create ) -------------
export default function AddNotes() {
  // const { mutate } = useMutation();

  const router = useRouter();

  //TODO: 3) define 'SetNotes' -- to save data from input: Title, Description
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  //TODO: 4) define 'HandleSubmit()' -- to save data from 'SetNotes' -> to API(server)
  //? to call API -- asynchronously
  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        }
      );
      const result = await response.json();
      console.log("result =>", result);

      if (result?.success) {
        //! if result= success -- data sent to /notes
        router.push("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const HandleSubmit = async () => {
  //   const response = await mutate({
  //     url: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  //     payload: notes,
  //   });
  //   if (response?.success) {
  //     router.push("/notes");
  //   }
  // };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {/* //TODO: 1) using component <Card> -- as container */}
        {/* -- title, description, submit  */}
        <Card margin="5" padding="5">

          <Heading>Add Notes</Heading>

          {/* //TODO: 2) using style component <Grid> -- <GridItem> */}
          <Grid gap="5">
            {/* //! grid item: Title */}
            <GridItem>
              <Text>Title</Text>
              {/* <Input type="text" /> */}
              <Input
                type="text"
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              //! data from input Text (event.target.value) -- will be saved in 'SetNotes'
              />
            </GridItem>

            {/* //! grid item: Description */}
            <GridItem>
              <Text>Description</Text>
              {/* <Textarea /> */}
              <Textarea
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              //! data from input Text -- will be saved in 'SetNotes'
              />
            </GridItem>

            {/* //! grid item: Submit */}
            <GridItem>
              <Button onClick={() => HandleSubmit()} colorScheme="blue">
                Submit
              </Button>
            </GridItem>

          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
