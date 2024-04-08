import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/types/project';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  project: Project = {} as Project; 
  projectForm: FormGroup;
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  imageSrc: (string | ArrayBuffer | null)[] = [];
  mainPhotoSrc: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  isLiked: boolean = false;
  likesCount: number = 0;

  constructor(private apiService: ApiService, private activeRouter: ActivatedRoute, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      mainPhoto: [''],
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
    this.activeRouter.params.subscribe((data) => {
        const id = data['projectId'];

        this.apiService.getProject(id).subscribe((project) => {
            this.project = project;
            this.likesCount = project.likes.length; 
            this.projectForm.patchValue(project);

            this.populateImageArray(project.images);

            if (project.mainPhoto) {
                this.mainPhotoSrc = project.mainPhoto;
            }

            this.populateFormArray('systems', project.systems);
            this.populateFormArray('challenges', project.challenges);
        });
    });
  }

  isCurrentUserOwner(): boolean {
    return !!this.project._ownerId && this.userService.currentUserId === this.project._ownerId.toString();
  }

  populateFormArray(formArrayName: string, values: string[]) {
    const controlArray = this.projectForm.get(formArrayName) as FormArray;
    for (let i = 0; i < values.length; i++) {
      if (i > 0 || controlArray.length === 0) {
        controlArray.push(this.fb.control(values[i]));
      }
    }
  }

  populateImageArray(images: string[]) {
    const imagesArray = this.projectForm.get('images') as FormArray;
    imagesArray.clear(); 
    
    images.forEach((image) => {
      this.imageSrc.push(image); 
  
      const isAttached = this.imageSrc.includes(image);
      if (!isAttached) {
        imagesArray.push(this.fb.control('')); 
      }
    });
  
    if (imagesArray.length < 3) {
      for (let i = imagesArray.length; i < 3; i++) {
        imagesArray.push(this.fb.control(''));
      }
    }
  }

  openEditModal() {
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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        if (typeof imageData === 'string') {
          this.imageSrc[index] = imageData;
          const imagesArray = this.projectForm.get('images') as FormArray;
          imagesArray.at(index).setValue(imageData); 
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
    const imagesArray = this.projectForm.get('images') as FormArray;
    imagesArray.at(index).reset(); 
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

  openDeleteModal() {
    console.log("Delete modal opened");
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    this.closeDeleteModal(true); 
  }
  
  closeDeleteModal(confirmed: boolean) {
    if (confirmed) {
      this.apiService.deleteProject(this.project._id).subscribe(() => {
        this.router.navigate(['/projects']);
      }, (error) => {
        console.error("Error deleting project:", error);
      });
    }
    this.isDeleteModalOpen = false;
  }

  toggleThumbAnimation() {
    const icon = document.querySelector('.thumb-icon');
    if (icon) {
      icon.classList.toggle('clicked');
      icon.classList.toggle('move-thumb'); // Toggle the animation class
    }
  }

  toggleLike() {
    const projectId = this.project._id;

    if (this.isLiked) {
        this.unlikeProject(projectId);
    } else {
        this.likeProject(projectId);
    }
  }
  
  likeProject(projectId: string) {
    this.apiService.like(projectId).subscribe(
      () => {
        this.likesCount++;
        this.isLiked = true;
        this.toggleThumbAnimation(); // Add this line
      },
      (error) => {
        console.error("Error liking project:", error);
      }
    );
  }

  unlikeProject(projectId: string) {
    this.apiService.unlike(projectId).subscribe(
      () => {
        this.likesCount--;
        this.isLiked = false;
        this.toggleThumbAnimation(); // Add this line
      },
      (error) => {
        console.error("Error unliking project:", error);
      }
    );
  }

  submitProject() {
    const projectId = this.project._id;
    const formData = this.projectForm.value;
    const formValues = {
      ...formData,
      mainPhoto: this.mainPhotoSrc,
      images: formData.images.filter((image: string) => !!image),
    };
    this.apiService.editProject(projectId, formValues).subscribe(() => {
      this.router.navigate(['/projects']);
    }, (error) => {
      console.error("Error updating project:", error);
    });
  }

  removeSystem(index: number) {
    const controlArray = this.projectForm.get('systems') as FormArray;
    controlArray.removeAt(index);
  }

  removeChallenge(index: number) {
    const controlArray = this.projectForm.get('challenges') as FormArray;
    controlArray.removeAt(index);
  }

  get systems(): FormArray {
    return this.projectForm.get('systems') as FormArray;
  }

  get challenges(): FormArray {
    return this.projectForm.get('challenges') as FormArray;
  }
}
