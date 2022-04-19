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
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <Wallet />
      <Bar />
      <Container
        maxW='4xl'
        minHeight={'60vh'}
        style={{ margin: 0, padding: 0 }}>
        <>{children}</>
      </Container>
    </Box>
  )
}

export default UI
