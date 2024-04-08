import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  userName: string = '';
  userEmail: string = '';
  message: string = '';

  constructor(private userService: UserService) {}

  saveMessage() {
    if (!this.userName || !this.userEmail || !this.message) {
      console.error('Please fill in all fields');
      return;
    }
  
    this.userService.saveMessage(this.userName, this.userEmail, this.message)
      .subscribe(() => {
        console.log('Message saved successfully');
        this.userName = '';
        this.userEmail = '';
        this.message = '';
      }, error => {
        console.error('Error saving message:', error);
      });
  }
}
