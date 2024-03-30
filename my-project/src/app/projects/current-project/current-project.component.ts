import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api-service.service';
import { Project } from 'src/app/types/project';

@Component({
  selector: 'app-current-project',
  templateUrl: './current-project.component.html',
  styleUrls: ['./current-project.component.css']
})
export class CurrentProjectComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const projectId = params['projectId'];
      this.getProject(projectId);
    });
  }

  getProject(projectId: string): void {
    this.apiService.getProject(projectId).subscribe(
      (project: Project) => {
        this.project = project;
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }
}
