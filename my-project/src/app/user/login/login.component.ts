import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from 'src/app/constants';

function phoneNumberValidator(control: FormControl): { [s: string]: boolean } | null {
  if (!control.value || !control.value.match(/^\d{10}$/)) {
    return { invalidPhoneNumber: true };
  }
  
  return null; 
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  domains = EMAIL_DOMAINS;
  isSignDivVisiable: boolean = true;
  selectedImage: File | null = null;

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required, phoneNumberValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    rePassword: new FormControl('', Validators.required),
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, tel, password, rePassword } = this.registerForm.value;
    let imageData: string = '';
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        imageData = reader.result as string;
        this.userService.register(username!, email!, tel!, password!, rePassword!, imageData).subscribe(() => {
          this.router.navigate(['/']);
        });
      };
    } else {
      this.userService.register(username!, email!, tel!, password!, rePassword!, imageData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).subscribe(() => {
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
