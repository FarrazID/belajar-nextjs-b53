//TODO: import step (1)
import Layout from "@/layout";
//TODO: import step (2)
import {
  Button, ButtonGroup, IconButton,
  Card, CardBody, CardFooter,
  Heading, Stack, Text,
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
//TODO: import step (3)
import { useGlobalContext } from "@/context/global";

import ModalForm from "@/components/modalForm";
import ConfirmationModal from "@/components/confirmation_modal";

export default function Home(notes) {
  //TODO: -- define all variables & functions here --
  //? state management & context
  //? routing & hooks
  //TODO: 1) fetch data from API -- 'notes' data supplied from 'getStaticProps()'s return
  const dataS = notes?.data
  // use console -- to show fetched data from API
  console.log('notes data =>', notes);

  //TODO: 2) call useGlobalContext() -- to get all data from 'GlobalContext' (states & handlers)
  // all states & handlers is defined in: component/context/global.js
  const { state, handleFunction } = useGlobalContext();
  const { id, setId, openConfirmation, closeConfirmation } = state;
  const { openModal, closeModal } = handleFunction;


  return (
    <>
      <Layout metaTitle="Home">
        <div className='px-10 pt-10'>
          <Button
            leftIcon={<AddIcon />}
            borderColor='#7F1D1D'
            color='#7F1D1D'
            variant='outline'
            onClick={openModal}
          >
            Add Notes
          </Button>
        </div>

        <div className="p-10 grid grid-cols-3 gap-10">
          {
            dataS?.map((data, index) => {
              return (
                <Card maxW='sm' key={index} border='1px' borderColor=''>

                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.title}</Heading>
                      <Text>
                        {data.description}
                      </Text>
                    </Stack>
                  </CardBody>

                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <IconButton
                        color='white'
                        backgroundColor='#7F1D1D'
                        aria-label='Delete Note'
                        icon={<DeleteIcon />}
                        borderRadius='full'
                        onClick={(e) => {
                          e.preventDefault()
                          setId(data.id)
                          openConfirmation()
                        }}
                      />

                      <IconButton
                        borderColor='#7F1D1D'
                        color='#7F1D1D'
                        variant='outline'
                        aria-label='Edit Note'
                        icon={<EditIcon />}
                        borderRadius='full'
                        value={data.id}
                        onClick={() => {
                          setId(data.id)
                          openModal()
                        }}
                      />
                    </ButtonGroup>
                  </CardFooter>

                </Card>
              )
            })
          }
        </div>

        <ModalForm id={id} />
        <ConfirmationModal id={id} />

      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
    const notes = await response.json()

    return { props: { notes }, revalidate: 10 }

  } catch (err) {
    return { props: { notes: null } }
  }
}
