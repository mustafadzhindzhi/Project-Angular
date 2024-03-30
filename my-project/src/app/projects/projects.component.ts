import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';
import { Project } from '../types/project';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.apiService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
