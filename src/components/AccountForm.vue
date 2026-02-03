<template lang="pug">
  div.accounts-manager
    div.header
      h2.title Учетные записи
      button.add-btn(@click="store.addAccount") +
    
    div.hint-block
      p ℹ️ Для указания нескольких меток используйте символ ";"

    div.accounts-list
      AccountRow(
        v-for="(account, index) in store.accounts"
        :key="index"
        :account="account"
        @update="(updated) => store.updateAccount(index, updated)"
        @remove="store.removeAccount(index)"
      )
      
      div.empty-state(v-if="store.accounts.length === 0")
        p Список пуст. Нажмите "+" чтобы добавить запись.
</template>

<script lang="ts" setup>
import { useAccountsStore } from '@/store/accounts';
import AccountRow from './AccountRow.vue';

const store = useAccountsStore();
</script>

<style lang="scss" scoped>
.accounts-manager {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.add-btn {
  font-size: 24px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #45a049;
  }
}

.hint-block {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>