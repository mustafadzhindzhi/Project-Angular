import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { Project } from 'src/app/types/project';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.css'],
  animations: [
    trigger('slideLeftRight', [
      transition(':increment', animateSlide(300, 'translateX(100%)', 'translateX(-100%)')),
      transition(':decrement', animateSlide(300, 'translateX(-100%)', 'translateX(100%)')),
    ])
  ]
})
export class SomeComponent implements OnInit {
  @ViewChild('projectsContainer') projectsContainer!: ElementRef;
  randomProjects: Project[] = [];
  currentIndex = 0;

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.getRandomProjects(3);
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
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

  moveProjects(direction: 'left' | 'right'): void {
    const container = this.projectsContainer.nativeElement;
    const scrollAmount = 300;
    const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;

    this.currentIndex = direction === 'left' ? this.currentIndex + 1 : this.currentIndex - 1;

    container.scrollBy({ left: scrollDirection, behavior: 'smooth' });
  }
}

function animateSlide(duration: number, enterTransform: string, leaveTransform: string) {
  return [
    query(':enter, :leave', style({ position: 'absolute', top: 0, width: '100%' }), { optional: true }),
    query(':enter', style({ transform: enterTransform }), { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    query(':leave', animate(duration + 'ms ease-out', style({ transform: leaveTransform })), { optional: true }),
    query(':enter', animate(duration + 'ms ease-out', style({ transform: 'translateX(0)' })), { optional: true }),
    query(':enter', animateChild(), { optional: true })
  ];
}
