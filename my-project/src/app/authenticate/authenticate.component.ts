import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('Attempting to fetch user profile...');
    this.userService.getProfile().subscribe({
      next: (user) => {
        console.log('User profile retrieved:', user);
        this.isAuthenticating = false;
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
        this.isAuthenticating = false;
      },
      complete: () => {
        console.log('Profile retrieval completed');
        this.isAuthenticating = false;
      },
    });
  }
}
