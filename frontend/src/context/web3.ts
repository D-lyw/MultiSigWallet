import { createContext } from 'react'

interface Web3InfoType {
  account: string;
  networkType: number;
  provider: Record<string, any>;
}

interface DefaultContextType {
  state: Web3InfoType;
  dispatch: React.Dispatch<{ value: any, type: string }>
}

export const defaultWeb3Info: Web3InfoType = {
  account: 'abc123',
  networkType: 1,
  provider: {}
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
      return { ...state, provider: action.value}
    default: return state;
  }
}

// @ts-ignore
export const Web3Context = createContext<DefaultContextType>({})