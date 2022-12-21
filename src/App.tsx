import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import abi from './abi.json';

import { CONTRACT_ADDRESS } from "./config"
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { DerpConnect } from './DerpConnect';
import { Button } from './Button';

const App = () => {
  const [view, setView] = useState<"mint" | "connect">("connect");

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();


  const { address } = useAccount();
  const { config, error: prepError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS as string,
    abi: abi,
    functionName: 'mint',
    args: [1],
    overrides: {
      value: ethers.utils.parseEther('0.1')
    }
  })
  console.log("details", CONTRACT_ADDRESS, config, prepError)
  const mintFunction = useContractWrite(config);
  const setViewCb = useCallback((view: "mint" | "connect") => { setView(view) }, [setView])
  useEffect(() => {
    if (address) {
      setViewCb("mint")
    } else {
      setViewCb("connect")
    }
  }, [address, setViewCb])
  useEffect(() => {
    if (prepError) {
      const parsed = getParsedEthersError(prepError)
      toast.error("prep error " + parsed?.context);
    }
    if (mintFunction.isSuccess) {
      toast.success('Minted successfully');
    }
    if (mintFunction.isError) {
      toast.error('Minting failed');
    }
  }, [mintFunction.isSuccess, mintFunction.isError, prepError]);

  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        padding: 12,
      }}
    >
      {view == "connect" && <DerpConnect />}

      {address &&
        <>
          <Button disabled={!mintFunction.write} onClick={() => { mintFunction.write?.() }}>Mint Now</Button>
          <div className="grid grid-cols-2 gap-2 text-center">

            {openAccountModal && (
              <a className="underline cursor-pointer" onClick={openAccountModal} >
                Account
              </a>
            )}

            {openChainModal && (
              <a className="underline cursor-pointer" onClick={openChainModal}>
                Chain
              </a>
            )}
          </div>
        </>}
      <ToastContainer />
    </div>
  );
};

export default App;
