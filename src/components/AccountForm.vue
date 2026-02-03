<template lang="pug">
  form.b-form(@submit.prevent="handleSubmit" :class="{ error: hasErrors }" novalidate)
    h2.form__title Добавить учётную запись
    div.form__row
      label(for='label-input') Метка
      input#label-input.form__input(
        type='text'
        placeholder='Метка'
        v-model.trim='state.label'
        @blur='onBlur("label")'
      )
      span.error-message(v-if="errors.label") {{ errors.label }}
    
    div.form__row
      label(for='type-select') Тип записи
      select#type-select.form__select(v-model='state.type')
        option(:value="AccountTypes.LDAP") LDAP
        option(:value="AccountTypes.LOCAL") Локальная
  
    div.form__row
      label(for='login-input') Логин
      input#login-input.form__input(
        type='text'
        placeholder='Логин'
        v-model.trim='state.login'
        @blur='onBlur("login")'
      )
      span.error-message(v-if="errors.login") {{ errors.login }}
   
    div.form__row(v-if='state.type === AccountTypes.LOCAL')
      label(for='password-input') Пароль
      input#password-input.form__input(
        type='password'
        placeholder='Пароль'
        v-model='state.password'
        @blur='onBlur("password")'
      )
      span.error-message(v-if="errors.password") {{ errors.password }}
     
    button.form__submit(type='submit') Сохранить
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useAccountsStore } from '@/store/accounts';
import { AccountTypes, type FormState, type IAccount, type ValidationErrors } from '@/types';

const store = useAccountsStore();

const state = reactive<FormState>({
  label: '',
  type: AccountTypes.LDAP,
  login: '',
  password: ''
});

const errors = reactive<ValidationErrors>({
  label: '',
  login: '',
  password: ''
});

const hasErrors = computed(() => Object.values(errors).some(error => !!error));

const validateField = (field: keyof Omit<FormState, 'type'>) => {
  let error = '';
  const value = state[field];

  switch (field) {
    case 'login':
      if (!value) error = 'Логин не может быть пустым.';
      else if (value.length < 3) error = 'Логин должен содержать не менее 3 символов.';
      break;
    case 'password':
      if (state.type === AccountTypes.LOCAL) {
        if (!value) error = 'Пароль не может быть пустым для локальной записи.';
        else if (value.length < 6) error = 'Пароль должен содержать не менее 6 символов.';
      }
      break;
  }
  errors[field] = error;
};

const onBlur = (field: keyof Omit<FormState, 'type'>) => validateField(field);

const handleSubmit = () => {
  validateField('login');
  validateField('password');
  if (hasErrors.value) return;

  const account: IAccount = {
    login: state.login,
    type: state.type,
    label: state.label ? state.label.split(',').map(s => s.trim()).filter(Boolean) : [],
  };
  if (state.type === AccountTypes.LOCAL) account.password = state.password;

  store.addAccount(account);

  // Reset form
  Object.assign(state, { label: '', type: AccountTypes.LDAP, login: '', password: '' });
  Object.assign(errors, { label: '', login: '', password: '' });
};
</script>

<style lang="scss" scoped>
.b-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>