import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
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

  searchProjects(searchTerm: string): void {
    if (searchTerm.trim() !== '') {
      this.apiService.searchProjects(searchTerm).subscribe(
        (projects: Project[]) => {
          this.projects = projects;
        },
        (error) => {
          console.error('Error searching projects:', error);
        }
      );
    } else {
      this.loadProjects();
    }
  }
}
