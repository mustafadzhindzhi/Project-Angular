import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/types/project';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  project: Project = {} as Project; 

  constructor(private apiService: ApiService, private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((data) => {
      const id = data['projectId'];

      this.apiService.getProject(id).subscribe((project) => {
        console.log('Project data:', project); 
        this.project = project;
    });
    })
  }
}