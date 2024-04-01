import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true; // Define isAuthenticating property
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Your authentication logic here
    // Once authentication is complete, set isAuthenticating to false
    this.isAuthenticating = false;
  }
}
