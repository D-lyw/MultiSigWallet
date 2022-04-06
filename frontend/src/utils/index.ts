
export const listenWalletChange = (provider: any, dispatch: React.Dispatch<{
  value: any;
  type: string;
}>) => {
  // 监听钱包地址和网络变化
  provider.on('accountsChanged', ([account]: string[]) => {
    dispatch({ value: account, type: 'AccountChange' });
  })
  provider.on('networkChanged', ([networkId]: number[]) => {
    dispatch({ value: networkId, type: 'NetworkChange' })
  })
}