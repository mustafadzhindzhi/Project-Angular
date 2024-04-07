import { AbstractControl, Validators } from '@angular/forms';

export function usernameValidator(control: AbstractControl): { [key: string]: any } | null {
  if (Validators.required(control)) {
    return null;
  }

  const valid = /^[a-zA-Z0-9]+$/.test(control.value);
  return valid ? null : { invalidUsername: true };
}
