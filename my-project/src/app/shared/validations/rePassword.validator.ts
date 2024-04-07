import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password && rePassword && password.value !== rePassword.value) {
    rePassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    return null;
  }
};
