import { FormControl } from '@angular/forms';

export function phoneNumberValidator(control: FormControl): { [s: string]: boolean } | null {
  const value = control.value;
  
  if (!value || (value.length >= 3 && value.length <= 10 && /^\d+$/.test(value))) {
    return null;
  } else {
    return { invalidPhoneNumber: true }; 
  }
}