import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Project } from '../types/project';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.css']
})
export class PersonalProjectsComponent implements OnInit {
  projects: Project[] = [];
  project: Project = {} as Project; 

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  isCurrentUserOwner(project: Project): boolean {
    return !!project._ownerId && this.userService.currentUserId === project._ownerId._id;
  }

  fetchProjects(): void {
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
