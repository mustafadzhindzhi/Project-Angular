import { Component, Input} from '@angular/core';
import { Project } from 'src/app/types/project';

@Component({
  selector: 'app-features-cards',
  templateUrl: './features-cards.component.html',
  styleUrls: ['./features-cards.component.css']
})
export class FeaturesCardsComponent  {
  @Input() projects: Project[] = [];

}
