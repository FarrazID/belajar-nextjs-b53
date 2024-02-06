// import { Inter } from 'next/font/google'
import Layout from '@/layout'

import {
  Button, ButtonGroup, IconButton,
  Box, Flex, Grid, GridItem,
  Card, CardBody, CardFooter,
  Heading, Stack, Text, useDisclosure
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import ModalForm from '@/components/modalForm'
import { useGlobalContext } from '@/context/global'
import { useState } from 'react'
import ConfirmationModal from '@/components/confirmation_modal'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ notes }) {
  const { state, handleFunction } = useGlobalContext();
  const { id, setId, openConfirmation } = state
  const { openModal } = handleFunction

  const datas = notes?.data

  return (
    <Layout metaTitle="Notes - Quiz 3">
      <Box padding="5">
        <Flex justifyContent='space-between'>
          {/* <div className='px-10 pt-10 m-10'> */}
          <Button leftIcon={<AddIcon />}
            // color='#7F1D1D' 
            colorScheme="orange"
            variant='solid' //'outline'
            // borderColor='red' //'#7F1D1D'
            onClick={openModal}>
            Add Notes
          </Button>
          {/* </div> */}
        </Flex>

        <Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}>
            {/* <div className="p-10 grid grid-cols-3 gap-5"> */}
            {

              datas?.map((data, index) => {
                return (
                  <GridItem key={data.id}>

                    <Card maxW='sm' key={index} border='1px' borderColor=''>

                      <CardBody>
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{data?.title}</Heading>
                          <Text>
                            {data?.description}
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
                              setId(data?.id)
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
                            value={data?.id}
                            onClick={() => {
                              setId(data?.id)
                              openModal()
                            }}
                          />
                        </ButtonGroup>
                      </CardFooter>

                    </Card>
                  </GridItem>
                )
              })

            }
          </Grid>
        </Flex>
      </Box>

      <ModalForm id={id} />
      <ConfirmationModal id={id} />
    </Layout >
  )
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
