import React, { useReducer, useEffect, useState, useCallback } from 'react';
import './App.scss';
import { Button, Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import { defaultWeb3Info, reducer, Web3Context } from './context/web3';
import { WalletConnect, NoWalletDetectedTsx, Address } from './components'
import Web3Modal, { IProviderOptions } from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers';
import { listenWalletChange } from './utils';
import Blockie from './components/Blockie';

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
  const { account, provider } = state

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
        account ? <Container className="App">
          <header>
            <div className='headerTitle'>MultiSignWallet Dapp Demo</div>
            <div>
              <Address address={account}/>
              {/* <Button size="sm" onClick={handleLogout}>Logout</Button> */}
            </div>
          </header>
          <Tabs>
            <Tab eventKey="wallet" title="多签钱包">
            </Tab>
            <Tab eventKey="manage" title="管理"></Tab>
          </Tabs>
        </Container> :
          // @ts-ignore
          <WalletConnect handleConnect={() => handleConnect(web3Modal)} web3Modal={web3Modal} />
      }
    </Web3Context.Provider>
  );
}

export default App;
