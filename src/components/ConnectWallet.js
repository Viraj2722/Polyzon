import React from 'react'
import { createThirdwebClient } from 'thirdweb';
import { ConnectButton } from 'thirdweb/react';
import { createWallet } from "thirdweb/wallets";

export default function ConnectWallet() {
  const client = createThirdwebClient({ clientId: "37c0e41b75dae5c17dd1a2858e185fb3" });

  return (
    <ConnectButton client={client} wallets={[createWallet("io.metamask")]} />
  )
}
