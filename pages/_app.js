import { Provider } from "next-auth/client";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
