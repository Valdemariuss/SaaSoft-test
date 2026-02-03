export interface IAccount {
    label: { text: string }[];
    type: 'ldap' | 'local';
    login: string;
    password: string | null;
  }

  export enum AccountTypes {
    LDAP = 'ldap',
    LOCAL = 'local'
  }

  export type LabelElement = { text: string };

  export type ValidationErrors = Record<'label' | 'login' | 'password', string>;

  export interface FormState {
    label: string;
    type: AccountTypes;
    login: string;
    password: string;
  }

  export type FieldValidators = Partial<
    Record<keyof FormState, (value: any) => boolean | string>
  >;

  export type ValidatorFunction<T extends FormState[keyof FormState]> = (
    value: T
  ) => boolean | string;

  export type AddAction = (account: IAccount) => void;
  export type RemoveAction = (index: number) => void;
