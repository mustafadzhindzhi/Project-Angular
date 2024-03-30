import { FormControl } from '@angular/forms';

export function phoneNumberValidator(control: FormControl): { [s: string]: boolean } | null {
  if (!control.value || !control.value.match(/^\d{10}$/)) {
    return { invalidPhoneNumber: true };
  }
  
  return null; 
}
