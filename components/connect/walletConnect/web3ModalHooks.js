import { useWeb3Modal, useDisconnect,useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { hookPropertyMap } from "next/dist/server/require-hook";

export function openModal() {
    const { open, close } = useWeb3Modal()
    return open()
  }

export function openModalAccount() {
    const { open } = useWeb3Modal()
    open({ view: 'Account' })
  }
export function disconnectModal() {
    const { disconnect } = useDisconnect()
    disconnect()    
}

export function ModalInfo() {
    console.log(address,chainId,isConnected)
    return address,chainId,isConnected
}