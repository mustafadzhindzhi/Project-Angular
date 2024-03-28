import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  constructor(private userService: UserService) {}

  get isLoggedIn():boolean {
    return this.userService.isLogged;
  }

}
