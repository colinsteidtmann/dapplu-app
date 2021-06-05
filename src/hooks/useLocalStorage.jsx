import create from 'zustand';
import { persist } from "zustand/middleware"


export const useLocalStorage = create(persist(set => ({
  userCurrency: 0,
  setUserCurrency: (value) => set({ userCurrency: value }),
})))




export default useLocalStorage;