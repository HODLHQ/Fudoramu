import { ethers } from 'ethers'

export enum ActionType {
  StartConnecting,
  SetConnection,
  SetAddress,
  SetENS,
  Reset
}

export interface StartConnecting {
  type: ActionType.StartConnecting
}

export interface SetConnection {
  type: ActionType.SetConnection
  payload: {
    instance: ethers.providers.Web3Provider
    provider: ethers.providers.Web3Provider
    signer: ethers.providers.JsonRpcSigner
    isTestnet: boolean
    address: string
  }
}

export interface SetAddress {
  type: ActionType.SetAddress
  payload: string
}

export interface SetENS {
  type: ActionType.SetENS
  payload: string
}

export interface Reset {
  type: ActionType.Reset
}

export type AppActions =
  | StartConnecting
  | SetConnection
  | SetAddress
  | SetENS
  | Reset
