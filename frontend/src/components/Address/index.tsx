import React from 'react'
import { getShortAddress } from '../../utils'
import Blockie from '../Blockie';
import './index.scss';

interface AddressProps {
  address: string;
  length?: number
}

const Address: React.FC<AddressProps> = (props) => {
  const { address, length = 6 } = props

  return <div className="addressBox">
    <span className='addressShort'>{getShortAddress(address, length)}</span>
    <Blockie address={address} size={6} />
  </div>
}

export default Address