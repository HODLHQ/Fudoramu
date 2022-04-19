import UI from '@/components/UI/UI'
import { Box, Container, Heading } from '@chakra-ui/react'
import { AppProvider } from '@/components/Context'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  },
  initialColorMode: 'dark'
}
const theme = extendTheme({ colors })

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Box>
          <UI>
            <Component {...pageProps} />
          </UI>
        </Box>
      </AppProvider>
    </ChakraProvider>
  )
}

export default MyApp
