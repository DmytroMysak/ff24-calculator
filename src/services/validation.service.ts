import { useI18n } from 'vue-i18n';
// @ts-ignore
import { required, minLength, integer, minValue, numeric, email } from '@vuelidate/validators/dist/raw.mjs';
import { createSharedComposable } from '@vueuse/core';

export const ValidationService = createSharedComposable(() => {
  const { t } = useI18n({ useScope: 'global' });

  return {
    required: (value: unknown) => required(value) || t('validation.required'),
    integer: (value: unknown) => integer(value) || t('validation.integer'),
    numeric: (value: unknown) => numeric(value) || t('validation.numeric'),
    email: (value: unknown) => email(value) || t('validation.email'),
    minLength: (length: number) => (value: unknown) =>
      minLength(length)(value) || t('validation.minLength', { minLength: length }),
    minValue: (length: number) => (value: unknown) =>
      minValue(length)(value) || t('validation.minValue', { minValue: length }),
  };
});
