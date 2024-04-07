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
  ownerProfile: UserForAuth | undefined;

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

  openEmailClient(email: string) {
    window.location.href = `mailto:${email}`;
  }

  openInstagram(username: string) {
    window.open(`https://instagram.com/${username}`, '_blank');
  }

  openFacebook(username: string) {
    window.open(`https://facebook.com/${username}`, '_blank');
  }
}
