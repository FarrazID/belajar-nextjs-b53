import { GlobalProvider } from '@/context/global';;
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.css';


//! without wrapper (ChakraProvider)
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
}
