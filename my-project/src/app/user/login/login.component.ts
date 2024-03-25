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
  domains = EMAIL_DOMAINS;

  isSignDivVisiable: boolean = true;

  // signUpObj: SignUpModel = new SignUpModel();
  // loginObj: LoginModel = new LoginModel();

  constructor(private userService: UserService,private router: Router) { }


  onRegister(form:NgForm) {
    if(form.invalid) {
      return
    }

    const {username, email, password, tel, rePassword } = form.value;

    this.userService.register(username, email, tel, password, rePassword).subscribe(() => {
      this.router.navigate(['/home'])

    })
    // const {email, password} = 
    // const localUser = localStorage.getItem('angular17users');
    // if (localUser != null) {
    //   const users = JSON.parse(localUser);
    //   users.push(this.signUpObj);
    //   localStorage.setItem('angular17users', JSON.stringify(users))
    // } else {
    //   const users = [];
    //   users.push(this.signUpObj);
    //   localStorage.setItem('angular17users', JSON.stringify(users))
    // }
    // alert('Registration Success')
  }

  onLogin(form: NgForm) {
    if(form.invalid) {
      return;
    }

    const {email, password } = form.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/home'])
    });

    // const localUsers = localStorage.getItem('angular17users');
    // if (localUsers != null) {
    //   const users = JSON.parse(localUsers);

    //   const isUserPresent = users.find((user: SignUpModel) => user.email == this.loginObj.email && user.password == this.loginObj.password);
    //   if (isUserPresent != undefined) {
    //     alert("User Found...");
    //     localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
    //     this.router.navigateByUrl('/home');
    //   } else {
    //     alert("No User Found")
    //   }
    // }
  }

}

// export class SignUpModel {
//   name: string;
//   email: string;
//   password: string;

//   constructor() {
//     this.email = "";
//     this.name = "";
//     this.password = ""
//   }
// }

// export class LoginModel {
//   email: string;
//   password: string;

//   constructor() {
//     this.email = "";
//     this.password = ""
//   }
// }