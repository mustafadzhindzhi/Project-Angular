import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Project } from 'src/app/types/project';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
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
