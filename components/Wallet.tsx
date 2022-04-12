import {
  reset,
  setAddress,
  setConnection,
  setENS,
  useApp
} from '@/components/Context'
import { providerOptions } from '@/utils/wallet'
import { useColorMode } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import Web3Modal from 'web3modal'

const cacheProvider = true
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const Wallet = () => {
  const { colorMode } = useColorMode()
  const { state, dispatch } = useApp()
  const { address, ens, isTestnet, instance, provider, signer, isConnecting } =
    state

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  // const [infuraProvider, setInfuraProvider] =
  //   useState<ethers.providers.JsonRpcProvider>()

  // useEffect(() => {
  //   if (address !== '') {
  //     const url = isTestnet
  //       ? `https://rinkeby.infura.io/v3/${infuraId}`
  //       : `https://mainnet.infura.io/v3/${infuraId}`
  //     setInfuraProvider(
  //       new ethers.providers.JsonRpcProvider(url)
  //     )
  //   }
  // }, [address, isTestnet])

  useEffect(() => {
    const checkENS = async () => {
      const ensName = await provider?.lookupAddress(address)
      if (ensName && ensName !== '') {
        dispatch(setENS(ensName))
      }
    }
    if (!isTestnet && address !== '' && ens === '') {
      checkENS()
    }
  }, [isTestnet, address, ens, provider, dispatch])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const modal = new Web3Modal({
        cacheProvider: true,
        theme: colorMode === 'dark' ? 'dark' : 'light',
        providerOptions
      })

      setWeb3Modal(modal)
    }
  }, [colorMode])

  const connect = useCallback(async () => {
    const instance = await web3Modal?.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const network = await provider.getNetwork()
    const isTestnet = Boolean(network.chainId !== 1)
    dispatch(
      setConnection({
        instance,
        provider,
        signer,
        isTestnet,
        address
      })
    )
  }, [dispatch, web3Modal])

  useEffect(() => {
    const load = async () => {
      await connect()
    }
    if (web3Modal) {
      if (isConnecting) {
        load()
      } else if (address === '' && cacheProvider) {
        if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
          load()
        }
      }
    }
  }, [web3Modal, address, isConnecting, connect])

  useEffect(() => {
    if (instance) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length) {
          dispatch(setAddress(accounts[0]))
        }
      }
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleConnect = (info: { chainId: number }) => {
        console.log(info)
      }

      const handleDisconnect = (_error: { code: number; message: string }) => {
        dispatch(reset())
        window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
      }

      instance.on('accountsChanged', handleAccountsChanged)
      instance.on('chainChanged', handleChainChanged)
      instance.on('connect', handleConnect)
      instance.on('disconnect', handleDisconnect)
      return () => {
        if (instance.removeListener) {
          instance.removeListener('accountsChanged', handleAccountsChanged)
          instance.removeListener('chainChanged', handleChainChanged)
          instance.removeListener('connect', handleConnect)
          instance.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [instance, dispatch])

  return null
}

export default Wallet
