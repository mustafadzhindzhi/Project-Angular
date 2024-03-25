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

  constructor(private userService: UserService,private router: Router) { }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { username, email, tel, password, rePassword } = form.value;

    this.userService.register(username, email, tel, password, rePassword).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  onLogin(form: NgForm) {
    // if (form.invalid) {
    //   return;
    // }
  
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  
    this.userService.login(this.email, this.password).subscribe(
      () => {
        console.log('Login successful');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
