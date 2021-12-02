import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('cpf', value => {
    if (!value || !value.length) {
      return true;
    }
  
    if (!/\d{3}.\d{3}.\d{3}-\d{2}/.test(value)) {
      return 'This field must be a valid cpf';
    }
  
    return true;
  });