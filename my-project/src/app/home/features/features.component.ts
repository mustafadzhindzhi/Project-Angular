import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { Project } from 'src/app/types/project';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', animateSlide(300, 'translateX(100%)', 'translateX(-100%)')),
      transition(':decrement', animateSlide(300, 'translateX(-100%)', 'translateX(100%)')),
    ])
  ]
})
export class FeaturesComponent implements OnInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  projects: Project[] = [];
  currentIndex = 0;

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  loadProjects(): void {
    if (this.userService.isLogged) {
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

  moveProjects(direction: 'left' | 'right'): void {
    const container = this.cardsContainer.nativeElement;
    const scrollAmount = 300;
    const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
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
