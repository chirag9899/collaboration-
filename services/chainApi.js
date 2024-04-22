import {
  web3Enable,
  isWeb3Injected,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";
import { ethers } from "ethers";
import { validate } from "bitcoin-address-validation";
import { request } from "@sats-connect/core";


async function singByUnisat(text) {
  if (!window.unisat) {
    throw new Error("No UniSat detected");
  }
  const hex = stringToHex(text);
  return await window.unisat.signMessage(hex);
}

async function singByXverse(text, address) {
  console.log(address)
  if (!window.XverseProviders) {
    throw new Error("No Xverse detected");
  }
  const hex = stringToHex(text);
  const options = {
    address: address,
    message: hex,
  };
  const signMessageResult = await request("signMessage", options)
  return signMessageResult.result.signature
}

async function singByMetaMask(text, address) {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    throw new Error("No MetaMask detected");
  }

  const hex = stringToHex(text);
  return await window.ethereum.request({
    method: "personal_sign",
    params: [hex, address],
  });
}

export const signMessageUniversal = async (text, address, connectedWallet) => {
  if (ethers.utils.isAddress(address)) {
    return singByMetaMask(text, address);
  }
  if (validate(address)) {
    if (connectedWallet === "unisat") {
      const result = await singByUnisat(text);
      return result;
    }
    if (connectedWallet === "xverse") {
      const result = await singByXverse(text, address);
      return result;
    }
  } else {
    if (!isWeb3Injected) {
      throw new Error("Polkadot Extension is not installed");
    }

    if (!address) {
      throw new Error("Sign address is missing");
    }

    await web3Enable("dvote.ai");
    const injector = await web3FromAddress(address);

    const data = stringToHex(text);
    const result = await injector.signer.signRaw({
      type: "bytes",
      data,
      address,
    });

    return result.signature;
  }
};

export const signApiData = async (data, address, connectedWallet) => {
  const dataToSign = {
    ...data,
    timestamp: parseInt(Date.now() / 1000),
  };
  const msg = JSON.stringify(dataToSign);
  const signature = await signMessageUniversal(msg, address, connectedWallet);

  return {
    data: dataToSign,
    address,
    signature,
  };
};

export const signedApiData = async (data, address, connectedWallet) => {
  const { space, pubkey } = data;
  const dataToSign = {
    pubkey,
    address,
    timestamp: parseInt(Date.now() / 1000),
  };
  const msg = JSON.stringify(dataToSign);
  const signature = await signMessageUniversal(msg, address, connectedWallet);

  return {
    data: dataToSign,
    address,
    signature,
    space,
  };
};
