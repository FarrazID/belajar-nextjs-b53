import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />  //default, with no wrapper (ChakraProvider)

  // using wrapper: <ChakraProvider>
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
}
