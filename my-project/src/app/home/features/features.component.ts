import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  constructor() { }

  

  moveProjects(direction: 'left' | 'right'): void {
    if (this.cardsContainer && this.cardsContainer.nativeElement) {
      const container = this.cardsContainer.nativeElement;
      const scrollAmount = 300; 
      
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  }
}
