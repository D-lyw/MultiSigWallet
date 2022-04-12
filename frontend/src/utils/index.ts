
export const listenWalletChange = (provider: any, dispatch: React.Dispatch<{
  value: any;
  type: string;
}>) => {
  // EIP-1193 standard: https://eips.ethereum.org/EIPS/eip-1193
  // 监听钱包地址和网络变化
  provider.on('accountsChanged', ([account]: string[]) => {
    dispatch({ value: account, type: 'AccountChange' });
  })
  provider.on('chainChanged', ([networkId]: number[]) => {
    dispatch({ value: networkId, type: 'NetworkChange' })
  })
  provider.on('connect', (info: Record<string, any>) => {
    console.log(info)
  })
  provider.on('disconnect', (message: Record<string, any>) => {
    console.log(message)
  })
}

export const getShortAddress = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};