// package imports
import { Web3Provider } from '@ethersproject/providers';
import create from 'zustand';
// custom imports
import { clearCachedProvider, connectToProvider, WALLET_PROVIDER } from '#connectors';



const useProviderStore = create((set, get) => ({
  loaded: false,
  account: '',
  name: WALLET_PROVIDER.UNKNOWN,
  chainId: 0,
  provider: null,
  signer: null,

  fetchAndSetProvider: async (provider: Web3Provider) => {
    const account = (await provider.listAccounts())[0];
    const { chainId } = await provider.getNetwork();

    return set({ account, loaded: true, chainId, provider, signer: provider.getSigner() });
  },

  connectProvider: async () => {
    const { updateProvider, disconnect, fetchAndSetProvider } = get();

    const connection = await connectToProvider();

    const provider = new Web3Provider(connection, 'any');

    connection.on('chainChanged', updateProvider);
    connection.on('accountsChanged', updateProvider);
    connection.on('disconnect', disconnect);

    fetchAndSetProvider(provider);
  },

  updateProvider: async () => {

    const { provider } = get();
    if (!provider) {
      return;
    }

    const account = (await provider.listAccounts())[0];
    const { chainId } = await provider.getNetwork();

    if (!account) {
      return set({
        loaded: false,
        account: '',
        chainId: 0,
        provider: null,
        signer: null,
      });
    }

    return set({ account, loaded: true, chainId });
  },

  disconnect: () => {
    clearCachedProvider();

    return set({
      loaded: false,
      account: '',
      chainId: 0,
      provider: null,
      signer: null,
    });
  },
  
  clearCachedProvider: () => {
    clearCachedProvider();
  }
}));



export default useProviderStore;