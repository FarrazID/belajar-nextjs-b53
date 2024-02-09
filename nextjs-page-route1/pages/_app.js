import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from '@/context/userContext';

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />  //default, with no wrapper (ChakraProvider)

  // using wrapper: <ChakraProvider> + <UserContextProvider>
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
