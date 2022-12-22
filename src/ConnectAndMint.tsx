import {
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import abi from './Presiderps.json';

import { CONTRACT_ADDRESS } from "./config"
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { DerpConnect } from './DerpConnect';
import { Button } from './Button';

export default function ConnectAndMint() {
  const [view, setView] = useState<"mint" | "connect">("connect");

  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const { address } = useAccount();
  const { config, error: prepError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS as string,
    abi: abi,
    functionName: 'mint',
  })
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
      toast.success('Minting transaction intiated');
    }
    if (mintFunction.isError) {
      toast.error('Minting failed');
    }
  }, [mintFunction.isSuccess, mintFunction.isError, prepError]);

  return (
    <div className="grid justify-items-center p-8">
      {view === "connect" && <DerpConnect />}

      {address &&
        <>
          <Button disabled={!mintFunction.write} onClick={() => { mintFunction.write?.() }}>Mint (Free)</Button>
          <div className="grid grid-cols-2 gap-2 text-center">

            {openAccountModal && (
              <span className="underline cursor-pointer" onClick={openAccountModal} >
                Account
              </span>
            )}

            {openChainModal && (
              <span className="underline cursor-pointer" onClick={openChainModal}>
                Chain
              </span>
            )}

          </div>
          <p>
            {mintFunction.isSuccess && (<a href={"https://mumbai.polygonscan.com/tx/" + mintFunction.data?.hash} className="underline cursor-pointer" target="_blank" rel="noreferrer">View Transaction</a>)}
          </p>
        </>}
    </div>
  );
};
