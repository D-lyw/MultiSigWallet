import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NETWORK_TYPE } from '../../constants'
import { Web3Context } from '../../context/web3'
import Web3Modal, { IProviderOptions } from 'web3modal'
import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { listenWalletChange } from '../../utils'

interface WalletConnectProps {
  handleConnect: any;
  web3Modal: Web3Modal | undefined;
}

/** 使用几种方式连接钱包 */
const WalletConnect: React.FC<WalletConnectProps> = (props) => {
  const { handleConnect } = props
  const { dispatch } = useContext(Web3Context)

  // 直接请求连接MetaMask钱包
  // const handleConnectWallet = async () => {
  //   const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  //   const networkType: NETWORK_TYPE = Number(window.ethereum.networkVersion)
  //   dispatch({ value: { account, networkType }, type: 'Connect' })

  //   listenWalletChange(window.ethereum, dispatch)
  // }

  // 仅支持使用MetaMask
  // return <Button onClick={handleConnectWallet} >连接钱包</Button>

  // 使用Web3Modal
  return <div>
    {<Button onClick={handleConnect} >连接钱包</Button>}
  </div>
}

export default WalletConnect