import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  ownerProfile: UserForAuth | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadOwnerProfile();
  }

  loadOwnerProfile() {
    this.userService.getProfile().subscribe(
      (profile: UserForAuth) => { 
        this.ownerProfile = profile;
      },
      error => {
        console.error('Error fetching owner profile:', error);
      }
    );
  }
}
