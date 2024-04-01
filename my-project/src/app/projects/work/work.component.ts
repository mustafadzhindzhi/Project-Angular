import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/types/project';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  projectForm: FormGroup;
  isModalOpen: boolean = false;
  imageSrc: (string | ArrayBuffer | null)[] = [];
  mainPhotoSrc: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      mainPhoto: ['', Validators.required],
      smallDesc: ['', Validators.required],
      bigDescription: ['', Validators.required],
      industry: ['', Validators.required],
      deliverables: ['', Validators.required],
      systems: this.fb.array([this.fb.control('')]),
      challenges: this.fb.array([this.fb.control('')]),
      approach: ['', Validators.required],
      images: this.fb.array([this.fb.control('')]),
    });
  }

  openShareProjectModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getFormArrayControls(formArrayName: string): AbstractControl[] {
    const formArray = this.projectForm.get(formArrayName);
    return (formArray instanceof FormArray) ? formArray.controls : [];
  }

  addInput(controlName: string) {
    const controlArray = this.projectForm.get(controlName) as FormArray;
    controlArray.push(this.fb.control('')); 
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc[index] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onMainPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.mainPhotoSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

 submitProject() {
  console.log("Submitting project...");

  // Ensure mainPhoto and at least one image are provided
  if (!this.mainPhotoSrc) {
    console.error("Main photo is required");
    return;
  }

  const imagesArray = this.projectForm.get('images') as FormArray;
  if (imagesArray.length === 0 || !imagesArray.value[0]) {
    console.error("At least one image is required");
    return;
  }

  const imagesData = this.imageSrc.map(image => image?.toString());

  const { projectName, smallDesc, bigDescription, industry, deliverables, systems, challenges, approach } = this.projectForm.value;

  const projectData = {
    projectName,
    smallDesc,
    bigDescription,
    industry,
    deliverables,
    systems,
    challenges,
    approach,
    mainPhoto: this.mainPhotoSrc.toString(),
    images: imagesData 
  };

  this.apiService.createProject(projectData).subscribe(() => {
    this.closeModal();
    this.router.navigate(['/projects']);
  }, (error) => {
    console.error("Error creating project:", error);
  });
}

  
  
  
  
}
