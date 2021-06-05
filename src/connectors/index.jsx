import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';

const WALLET_PROVIDER = {
  SAFE: 'SAFE',
  METAMASK: 'METAMASK',
  REMOTE: 'REMOTE',
  TORUS: 'TORUS',
  PORTIS: 'PORTIS',
  FORTMATIC: 'FORTMATIC',
  SQUARELINK: 'SQUARELINK',
  WALLETCONNECT: 'WALLETCONNECT',
  OPERA: 'OPERA',
  WALLETLINK: 'WALLETLINK',
  AUTHEREUM: 'AUTHEREUM',
  LEDGER: 'LEDGER',
  TREZOR: 'TREZOR',
  LATTICE: 'LATTICE',
  UNKNOWN: 'UNKNOWN',
};

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      // Mikko's test key - don't copy as your mileage may vary
      infuraId: "82b8340f4bd146a2bfc606609ffbec41",
    }
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});


const connectToProvider = async () => {
  // web3Modal.clearCachedProvider();
  const provider = await web3Modal.connect();
  return provider;
};

const getCachedProvider = () => web3Modal.cachedProvider;

const clearCachedProvider = () => (web3Modal.clearCachedProvider());

export { WALLET_PROVIDER, connectToProvider, getCachedProvider, clearCachedProvider };
