import type { NextPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'

const Splash = dynamic(() => import('../components/Splash'), { ssr: false })

const Home: NextPage = () => {
  return <Splash />
}
export default Home
