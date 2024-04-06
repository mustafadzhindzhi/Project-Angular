import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Project } from 'src/app/types/project';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.css'],
  animations: [
    trigger('slideLeftRight', [
      transition(':increment', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-33%)' })),
        animate('0.2s', style({ opacity: 0 })),
      ]),
      transition(':decrement', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(33%)' })),
        animate('0.2s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SomeComponent implements OnInit {
  randomProjects: Project[] = [];
  currentIndex = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRandomProjects(3); 
  }

  getRandomProjects(count: number): void {
    this.apiService.getRandomProjects(count).subscribe(
      (projects: Project[]) => {
        this.randomProjects = projects;
      },
      (error) => {
        console.error('Error fetching random projects:', error);
      }
    );
  }

  moveProjectsLeft(): void {
    const lastProject = this.randomProjects.pop();
    this.randomProjects.unshift(lastProject!);
  }

  moveProjectsRight(): void {
    const firstProject = this.randomProjects.shift();
    this.randomProjects.push(firstProject!);
  }
}
