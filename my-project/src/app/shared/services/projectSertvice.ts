import { Injectable } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private fb: FormBuilder) { }

  populateFormArray(formArray: FormArray, values: string[]) {
    // Implementation for populating form array
  }

  clearFormArray(formArray: FormArray) {
    // Implementation for clearing form array
  }
}
