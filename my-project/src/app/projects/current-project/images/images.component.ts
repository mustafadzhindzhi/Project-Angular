import { Component } from '@angular/core';
import { Project } from 'src/app/types/project';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {

  project: Project = {} as Project; 

  constructor(private apiService: ApiService, private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((data) => {
      const id = data['projectId'];

      this.apiService.getProject(id).subscribe((project) => {
        this.project = project;
    });
    })
  }
}