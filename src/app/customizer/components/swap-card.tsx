"use client";
import { useEthersSigner } from '@/lib/ethers';
import { JsonRpcProvider, SwapWidget, Theme, darkTheme, lightTheme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useState } from 'react';
import './swap-card.css';

export default function SwapCard() {

  const hideConnectionUI = false;

  const [provider, setProvider] = useState<JsonRpcProvider>();
  const themeDark: Theme = {
    ...darkTheme,
  }
  const themeLight: Theme = {
    ...lightTheme,
    accent: '#161e31',
   
  }
  useEthersSigner().then((signer: any) => {
    setProvider(signer?.provider as JsonRpcProvider);
  });



  return (
    <>
        <SwapWidget  disableBranding={true}  hideConnectionUI={hideConnectionUI} />
      
    </>
  );
}