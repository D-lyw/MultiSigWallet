import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NETWORK_TYPE } from '../../constants'
import { Web3Context } from '../../context/web3'
import Web3Modal, { IProviderOptions } from 'web3modal'
import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

interface WalletConnectProps {
  connectType: number
}

/** 使用几种方式连接钱包 */
const WalletConnect: React.FC<WalletConnectProps> = (props) => {
  const { connectType } = props
  const { dispatch, state } = useContext(Web3Context)
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>()

  // 直接请求连接MetaMask钱包
  const handleConnectWallet = async () => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const networkType: NETWORK_TYPE = Number(window.ethereum.networkVersion)
    dispatch({ value: { account, networkType }, type: 'Connect' })

    // 监听钱包地址和网络变化
    window.ethereum.on('accountsChanged', ([account]: string[]) => {
      dispatch({ value: account, type: 'AccountChange' });
    })
    window.ethereum.on('networkChanged', ([networkId]: number[]) => {
      dispatch({ value: networkId, type: 'NetworkChange' })
    })
  }

  // 使用Web3Modal库支持多种钱包连接
  const handleWeb3ModalConnect = async () => {
    const providerOptions: IProviderOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.INFURA_ID
        }
      }
    };
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: false, // optional
      // disableInjectedProvider: true,
      providerOptions // required
    });
    web3Modal.clearCachedProvider()
    const instance = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(instance);

    console.log(await provider.getBlockNumber())
    dispatch({ value: provider, type: 'SetProvider' })
    setWeb3Modal(web3Modal)
  }


  // 仅支持使用MetaMask
  // return <Button onClick={handleConnectWallet} >连接钱包</Button>

  // 使用Web3Modal
  return <div>
    <Button onClick={handleWeb3ModalConnect} >连接钱包</Button>
    <Button onClick={() => { web3Modal?.clearCachedProvider() }}>Disconnect</Button>
  </div>
}

export default WalletConnect