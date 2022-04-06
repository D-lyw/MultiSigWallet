import React, { useReducer, useEffect, useState, useCallback } from 'react';
import './App.scss';
import { Button } from 'react-bootstrap';
import { defaultWeb3Info, reducer, Web3Context } from './context/web3';
import { WalletConnect, NoWalletDetectedTsx } from './components'
import Web3Modal, { IProviderOptions } from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers';
import { listenWalletChange } from './utils';

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, defaultWeb3Info)
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
  const { account } = state

  useEffect(() => {
    // 实例化web3modal
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    setWeb3Modal(web3Modal)

    // 判断当前区块链网络信息、账号信息、连接状态
    if (web3Modal.cachedProvider) {
      handleConnect(web3Modal)
    }

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [])

  const handleConnect = async (web3Modal: Web3Modal) => {
    const instance = await web3Modal?.connect()
    const provider = new ethers.providers.Web3Provider(instance);
    const { chainId } = await provider.getNetwork()
    const signer = await provider.getSigner()
    const account = await signer.getAddress()
    dispatch({ value: { account, provider, signer, networkType: chainId }, type: 'Connect' })
    listenWalletChange(provider.provider, dispatch)
  }

  const handleLogout = async () => {
    await web3Modal?.clearCachedProvider()
    dispatch({ type: 'Reset', value: null })
  }

  return (
    <Web3Context.Provider value={{ state, dispatch }}>
      {
        account ? <div className="App">
          <header className="App-header">
            {account} <Button onClick={handleLogout}>Logout</Button>
          </header>
        </div> :
          // @ts-ignore
          <WalletConnect handleConnect={() => handleConnect(web3Modal)} web3Modal={web3Modal} />
      }
    </Web3Context.Provider>
  );
}

export default App;
