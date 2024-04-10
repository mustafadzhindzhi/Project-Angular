import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
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
  selectedImage: File | null = null;
  projects: Project[] = [];
  searchTerm: string = '';
  areFourImagesUploaded: boolean = false;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

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
      images: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  searchProjects(): void {
    const searchTermProcessed = this.searchTerm.trim().toLowerCase().replace(/\s+/g, '');
  
    this.apiService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects.filter((project: Project) =>
          project.projectName.toLowerCase().replace(/\s+/g, '').includes(searchTermProcessed)
        );
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  
    this.search.emit(this.searchTerm);
    this.searchTerm = '';
  }

  openShareProjectModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getFormArrayControls(formArrayName: string): AbstractControl[] {
    return (this.projectForm.get(formArrayName) as FormArray).controls;
  }

  addInput(controlName: string) {
    const controlArray = this.projectForm.get(controlName) as FormArray;
    controlArray.push(this.fb.control(''));
  }

  onImageSelected(event: any, index: number) {
    const imagesArray = this.projectForm.get('images') as FormArray;
  
    if (imagesArray.length >= 5) { 
      return;
    }
  
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        if (typeof imageData === 'string') {
          this.imageSrc[index] = imageData;
          imagesArray.push(this.fb.control(imageData));
          if (imagesArray.length === 4) {
            this.areFourImagesUploaded = true;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onMainPhotoSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
      if (this.selectedImage) {
        this.readImage(this.selectedImage);
        event.target.disabled = true;
      }
    }
  }

  clearMainPhoto() {
    this.mainPhotoSrc = null;
    const mainPhotoInput = document.getElementById('mainPhoto') as HTMLInputElement;
    if (mainPhotoInput) {
      mainPhotoInput.value = ''; 
      mainPhotoInput.disabled = false; 
    }
  }

  clearImage(index: number) {
    this.imageSrc[index] = null;
    const imageInput = document.getElementById(`imageInput${index}`) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = ''; 
    }
  }
  
  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.mainPhotoSrc = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  submitProject() {
    const imagesArray = this.projectForm.get('images') as FormArray;

    if (imagesArray.controls.length === 0 || imagesArray.value.every((image: string | null) => !image)) {
      console.error("At least one image is required");
      return;
    }

    const imagesData = this.imageSrc.map((image: string | ArrayBuffer | null) => image?.toString());

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
      mainPhoto: this.mainPhotoSrc?.toString(),
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