import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  domains = EMAIL_DOMAINS;

  isSignDivVisiable: boolean = true;
  selectedImage: File | null = null; 

  constructor(private userService: UserService, private router: Router) { }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    const { username, email, tel, password, rePassword } = form.value;
  
    let imageData: string = ''; 
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        imageData = reader.result as string;
  
        this.userService.register(username, email, tel, password, rePassword, imageData).subscribe(() => {
          this.router.navigate(['/']);
        });
      };
    } else {
      this.userService.register(username, email, tel, password, rePassword, imageData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;
    this.userService.login(this.email, this.password).subscribe(() => {
      console.log('Login successful');
      this.router.navigate(['/']);
    });
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
    }
  }
}
