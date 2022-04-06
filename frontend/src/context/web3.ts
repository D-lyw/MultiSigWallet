import Web3Modal from 'web3modal';
import { createContext } from 'react'
import { Signer } from 'ethers';

interface Web3InfoType {
  account: string;
  networkType: number;
  provider: Record<string, any>;
  web3Modal: Web3Modal | null;
  signer: Signer | null;
}

interface DefaultContextType {
  state: Web3InfoType;
  dispatch: React.Dispatch<{ value: any, type: string }>
}

export const defaultWeb3Info: Web3InfoType = {
  account: '',
  networkType: 1,
  provider: {},
  web3Modal: null,
  signer: null
}

export const reducer = (state: Web3InfoType, action: { value: any, type: string }) => {
  switch (action.type) {
    case "Connect":
      return { ...state, ...action.value }
    case 'AccountChange':
      return { ...state, account: action.value }
    case 'NetworkChange':
      return { ...state, networkType: action.value }
    case 'SetProvider':
      return { ...state, provider: action.value }
    case 'SetSigner':
      return { ...state, signer: action.value }
    case 'SetWeb3Modal':
      return { ...state, web3Modal: action.value }
    case 'Reset':
      return { ...defaultWeb3Info }
    default: return state;
  }
}

// @ts-ignore
export const Web3Context = createContext<DefaultContextType>({})