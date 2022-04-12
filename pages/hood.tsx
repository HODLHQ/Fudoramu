import UI from '@/components/UI/UI'
import { Box, Container, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { AppProvider } from '@/components/Context'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}
const theme = extendTheme({ colors })

const Hood: NextPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <Box>
          <UI>
            <Container maxW={'5xl'}>
              <Heading>Fudoramu</Heading>
            </Container>
          </UI>
        </Box>
      </AppProvider>
    </ChakraProvider>
  )
}
export default Hood
