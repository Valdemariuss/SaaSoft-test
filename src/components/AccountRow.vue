<template lang="pug">
div.account-row
  div.form__row
    label Метка
    input.form__input(
      type='text'
      v-model='labelStr'
      @blur='onBlur("label")'
      :class="{ 'error-border': errors.label }"
      placeholder='Метка1; Метка2'
    )
    span.error-message(v-if="errors.label") {{ errors.label }}

  div.form__row
    label Тип записи
    select.form__select(v-model='localAccount.type' @change='onTypeChange')
      option(:value="AccountTypes.LDAP") LDAP
      option(:value="AccountTypes.LOCAL") Локальная

  div.form__row
    label Логин
    input.form__input(
      type='text'
      v-model.trim='localAccount.login'
      @blur='onBlur("login")'
      :class="{ 'error-border': errors.login }"
    )
    span.error-message(v-if="errors.login") {{ errors.login }}

  div.form__row(v-if='localAccount.type === AccountTypes.LOCAL')
    label Пароль
    input.form__input(
      type='password'
      v-model='localAccount.password'
      @blur='onBlur("password")'
      :class="{ 'error-border': errors.password }"
    )
    span.error-message(v-if="errors.password") {{ errors.password }}

  button.remove-btn(@click="$emit('remove')")
    span 🗑️
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { AccountTypes, type IAccount } from '@/types';

const props = defineProps<{
  account: IAccount;
}>();

const emit = defineEmits<{
  (e: 'update', account: IAccount): void;
  (e: 'remove'): void;
}>();

// Local copy for editing
const localAccount = reactive<IAccount>({ ...props.account });

// Transform label object array to string for input
const labelStr = ref(props.account.label.map(l => l.text).join('; '));

const errors = reactive({
  label: '',
  login: '',
  password: ''
});

const validate = () => {
  let isValid = true;

  // Label Validation
  if (labelStr.value.length > 50) {
    errors.label = 'Максимум 50 символов';
    isValid = false;
  } else {
    errors.label = '';
  }

  // Login Validation
  if (!localAccount.login) {
    errors.login = 'Обязательное поле';
    isValid = false;
  } else if (localAccount.login.length > 100) {
    errors.login = 'Максимум 100 символов';
    isValid = false;
  } else {
    errors.login = '';
  }

  // Password Validation
  if (localAccount.type === AccountTypes.LOCAL) {
    if (!localAccount.password) {
      errors.password = 'Обязательное поле';
      isValid = false;
    } else if (localAccount.password.length > 100) {
      errors.password = 'Максимум 100 символов';
      isValid = false;
    } else {
      errors.password = '';
    }
  }

  return isValid;
};

const save = () => {
  // Parse label string back to object array
  localAccount.label = labelStr.value
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(text => ({ text }));

  if (validate()) {
    emit('update', { ...localAccount });
  }
};

const onBlur = (field: string) => {
  save();
};

const onTypeChange = () => {
  if (localAccount.type === AccountTypes.LDAP) {
    localAccount.password = null;
  }
  save();
};
</script>

<style lang="scss" scoped>
.account-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr 50px;
  gap: 10px;
  align-items: start;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
}

.form__row {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.form__input, .form__select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &.error-border {
    border-color: red;
  }
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    margin-top: 0;
    align-self: flex-end;
  }
}
</style>