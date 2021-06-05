import create from 'zustand';

export const useGeneralStore = create((set,get) => ({
	usersAgreements: [],
	setUsersAgreements: (_usersAgreements) => set({usersAgreements: _usersAgreements}),
	
	contractEvent: undefined,
	setContractEvent: (event) => set({contractEvent: event}),

	contractError: undefined,
	setContractError: (error) => set({contractError: error}),




}))

export default useGeneralStore;