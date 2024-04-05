import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css']
})
export class ReadyComponent {
  constructor(private userService: UserService) {}
  
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
}
