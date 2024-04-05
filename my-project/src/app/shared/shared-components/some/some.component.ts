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
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class SomeComponent implements OnInit {
  randomProjects: Project[] = [];
  currentIndex = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getRandomProjects(5); 
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
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  moveProjectsRight(): void {
    if (this.currentIndex < this.randomProjects.length - 1) {
      this.currentIndex++;
    }
  }
}
