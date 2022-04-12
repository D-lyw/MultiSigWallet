import React from 'react'
import Blockies from 'react-blockies'
// @ts-ignore
import styles from './index.scss'

interface BlockieProps {
  /** set wallet address as the seed */
  address?: string;
  /** optional class name for the canvas element; "identicon" by default */
  className?: string;
  /** number of squares wide/tall the image will be; default = 15 */
  size?: number;
  /** width/height of each square in pixels; default = 4 */
  scale?: number;
  /** normal color; random by default */
  color?: string;
  /** background color; random by default  */
  bgColor?: string;
  /** color of the more notable features; random by default */
  spotColor?: string;
}

/**
 * generate address avatar by wallet address 
 * @param props 
 * @returns JSX Element
 */
const Blockie: React.FC<BlockieProps> = (props) => {
  const { address = '0x000000000000000000000000000000000000dead', className, ...restProps } = props

  return <Blockies
    seed={address.toLowerCase()}
    className={className ? className : styles.identicon}
    {...restProps}
  />
}

export default Blockie