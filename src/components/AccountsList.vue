<template lang="pug">
  ul.accounts-list
    li.account-item(v-for="(acc, index) in accounts" :key="index")
      span.item-label(v-text="acc.label.join(', ') || '-'")
      span.item-type(v-text="`(${acc.type})`")
      span.item-login(v-text="acc.login")
      button.btn-remove(@click="removeAccount(index)") Удалить
</template>

<script lang="ts" setup>
import { useStore } from '@/store/accounts';

const store = useStore();
const accounts = store.accounts;

function removeAccount(index: number) {
  store.removeAccount(index);
}
</script>

<style lang="scss" scoped>
.accounts-list {
  list-style: none;
  padding: 0;

  .account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;

    .btn-remove {
      background-color: #dc3545;
      color: #fff;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}
</style>