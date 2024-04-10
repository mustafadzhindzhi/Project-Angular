import { Injectable } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private fb: FormBuilder) { }

  populateFormArray(formArray: FormArray, values: string[]) {
  }

  clearFormArray(formArray: FormArray) {
  }
}
