import { defineStore } from 'pinia';
import type { IAccount } from '../types';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as IAccount[],
  }),
  actions: {
    addAccount(account: IAccount) {
      this.accounts.push(account);
    },
    removeAccount(index: number) {
      this.accounts.splice(index, 1);
    },
  },
});

// Alias for compatibility
export const useStore = useAccountsStore;
