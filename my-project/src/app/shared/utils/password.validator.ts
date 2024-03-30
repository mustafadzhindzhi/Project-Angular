import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  if (Validators.required(control)) {
    return null;
  }

  const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(control.value);
  return valid ? null : { invalidPassword: true };
}
