import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  private swiper: Swiper | undefined;

  constructor(private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngAfterViewInit(): void {
    if (this.cardsContainer && this.cardsContainer.nativeElement) {
      console.log("Container element found:", this.cardsContainer.nativeElement);
      
      // Initialize Swiper
      this.swiper = new Swiper(this.cardsContainer.nativeElement, {
        navigation: {
          nextEl: '.arrow-button--next',
          prevEl: '.arrow-button--prev',
        },
        slidesPerView: 1,
        spaceBetween: 16, 
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        }
      });

      console.log("Swiper initialized:", this.swiper);
    } else {
      console.error("Container element not found or undefined.");
    }
  }

  moveProjects(direction: 'left' | 'right'): void {
    if (this.swiper) {
      if (direction === 'left') {
        this.swiper.slidePrev();
      } else {
        this.swiper.slideNext();
      }
    }
  }
}
