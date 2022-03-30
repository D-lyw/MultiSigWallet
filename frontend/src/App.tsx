import React, { useReducer, useEffect } from 'react';
import './App.scss';
import { Button } from 'react-bootstrap';
import { defaultWeb3Info, reducer, Web3Context } from './context/web3';
import { WalletConnect, NoWalletDetectedTsx } from './components'

function App() {
  const [state, dispatch] = useReducer(reducer, defaultWeb3Info)


  useEffect(() => {
    // 判断当前区块链网络信息、账号信息、连接状态

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [])


  if (!window.ethereum) {
    // return <NoWalletDetectedTsx />
  }

  return (
    <Web3Context.Provider value={{ state, dispatch }}>
      <div className="App">
        <header className="App-header">
          {state.account}
          <WalletConnect connectType={2}/>
        </header>
      </div>
    </Web3Context.Provider>
  );
}

export default App;
