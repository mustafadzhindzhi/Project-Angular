import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;
  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.userService.getProfile().subscribe({
        next: () => {
          this.isAuthenticating = false;
        },
        error: () => {
          this.isAuthenticating = false;
        },
        complete: () => {
          this.isAuthenticating = false;
        },
      });
    } else {
      this.isAuthenticating = false; 
    }
  }
}
