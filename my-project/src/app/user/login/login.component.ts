import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { phoneNumberValidator } from 'src/app/shared/utils/phone-number.validator';
import { usernameValidator } from 'src/app/shared/utils/username.validator';
import { passwordValidator } from 'src/app/shared/utils/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  domains = EMAIL_DOMAINS;
  isSignDivVisiable: boolean = true;
  selectedImage: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, phoneNumberValidator]],
      password: ['', [Validators.required, Validators.minLength(8), passwordValidator]],
      rePassword: ['', Validators.required],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      rememberMe: [false] 
    });
    
    const rememberedUser = this.getRememberedUser();
    if (rememberedUser) {
      this.loginForm.patchValue({
        email: rememberedUser.email,
        password: rememberedUser.password,
        rememberMe: true
      });
    }
  }

  ngOnInit(): void {}

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

    const { email, password, rememberMe } = this.loginForm.value;
    this.userService.login(email, password).subscribe(() => {
      console.log('Login successful');
      this.router.navigate(['/']);
    });

    if (rememberMe) {
      this.setRememberedUser(email, password);
    } else {
      this.clearRememberedUser();
    }
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
      if (this.selectedImage) {
        this.readImage(this.selectedImage);
      }
    }
  }
  
  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageSrc = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  private setRememberedUser(email: string, password: string): void {
    // Set a cookie with user's email and password
    document.cookie = `rememberedUser=${email}:${password};max-age=${30 * 24 * 60 * 60}`;
  }

  private getRememberedUser(): { email: string, password: string } | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'rememberedUser') {
        const [email, password] = value.split(':');
        return { email, password };
      }
    }
    return null;
  }

  private clearRememberedUser(): void {
    // Clear the remembered user cookie
    document.cookie = 'rememberedUser=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}


