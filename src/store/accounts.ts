import { defineStore } from 'pinia';
import type { IAccount } from '../types';

const STORAGE_KEY = 'accounts_data';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as IAccount[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        label: [],
        type: 'ldap',
        login: '',
        password: null
      } as IAccount);
      this.saveToLocalStorage();
    },
    removeAccount(index: number) {
      this.accounts.splice(index, 1);
      this.saveToLocalStorage();
    },
    updateAccount(index: number, account: IAccount) {
      this.accounts[index] = account;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts));
    },
  },
});

// Alias for compatibility
export const useStore = useAccountsStore;
