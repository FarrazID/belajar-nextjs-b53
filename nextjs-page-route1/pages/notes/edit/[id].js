import dynamic from "next/dynamic";
import {
  Box,
  Flex,
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
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

//! --------- TUGAS: H13 - REST API + CRUD ( Edit + Update ) -------------
export default function EditNotes() {

  const router = useRouter();
  const { id } = router?.query;
  const [notes, setNotes] = useState();

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.push("/notes");
      }
    } catch (error) { }
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
      );
      const listNotes = await res.json();
      setNotes(listNotes?.data);
    }
    fetchingData();
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>

          <Grid gap="5">
            {/* //! grid item: Title */}
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                value={notes?.title || ""}
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>

            {/* //! grid item: Description */}
            <GridItem>
              <Text>Description</Text>
              <Textarea
                value={notes?.description || ""}
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
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
