import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserForAuth } from '../types/user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  profiles: UserForAuth[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfiles(); 
  }

  loadProfiles() {
    this.userService.getProfiles().subscribe(
      (profiles: UserForAuth[]) => { 
        this.profiles = profiles; 
      },
      error => {
        console.error('Error fetching profiles:', error);
      }
    );
  }
}
