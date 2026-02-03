<template lang="pug">
  .app
    header.app-header
      h1.app-title Управление учётными записями
    
    main.app-main
      AccountForm
</template>

<script lang="ts" setup>
import AccountForm from '@/components/AccountForm.vue';
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  background-color: #f5f5f5;

  .app-header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;

    .app-title {
      margin: 0;
      font-size: 24px;
    }
  }

  .app-main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
}
</style>
