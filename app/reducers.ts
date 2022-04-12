import {
  ActionType,
  AppActions,
  Reset,
  SetAddress,
  SetConnection,
  SetENS,
  StartConnecting
} from '@/app/actions'
import { AppState, initialAppState } from '@/app/state'
import { ethers } from 'ethers'

export const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case ActionType.StartConnecting:
      return { ...state, isConnecting: true }
    case ActionType.SetConnection:
      return {
        ...state,
        instance: action.payload.instance,
        provider: action.payload.provider,
        signer: action.payload.signer,
        isTestnet: action.payload.isTestnet,
        address: action.payload.address,
        isConnecting: false
      }
    case ActionType.SetAddress:
      return {
        ...state,
        address: action.payload,
        ens: ''
      }
    case ActionType.SetENS:
      return {
        ...state,
        ens: action.payload
      }
    case ActionType.Reset:
      return initialAppState
    default:
      return state
  }
}

export const startConnecting = (): StartConnecting => ({
  type: ActionType.StartConnecting
})

export const setConnection = ({
  instance,
  provider,
  signer,
  isTestnet,
  address
}: {
  instance: ethers.providers.Web3Provider
  provider: ethers.providers.Web3Provider
  signer: ethers.providers.JsonRpcSigner
  isTestnet: boolean
  address: string
}): SetConnection => ({
  type: ActionType.SetConnection,
  payload: {
    instance,
    provider,
    signer,
    isTestnet,
    address
  }
})

export const setAddress = (address: string): SetAddress => ({
  type: ActionType.SetAddress,
  payload: address
})

export const setENS = (ens: string): SetENS => ({
  type: ActionType.SetENS,
  payload: ens
})

export const reset = (): Reset => ({
  type: ActionType.Reset
})
