import Bar from '@/components/UI/Bar'
import Wallet from '@/components/Wallet'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'

const UI = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Head>
        <title>Fudoramu</title>
        <meta name='description' content='Fudoramu' />
        <link rel='icon' href='/favicon.gif' type='image/gif' />
      </Head>
      <Wallet/>
      <Bar/>
      <Container maxW='4xl' minHeight={'60vh'} style={{ margin:0, padding: 0}}>
        {children}
      </Container>
    </Box>
  )
}

export default UI
