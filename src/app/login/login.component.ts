// import { Component, OnDestroy, OnInit, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { User } from '../models/User.class';
// import { LoginService } from '../services/login.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   username: string = '';
//   password: string = '';
//   user: User = {} as User;
//   loginSubscription?: Subscription;
//   constructor(
//     private router: Router,
//     private LoginService: LoginService,
//     private toastr: ToastrService
//   ) {}
//   ngOnDestroy(): void {
//     this.loginSubscription?.unsubscribe();
//   }
//   ngOnInit(): void {}

//   loginUser(evt: any) {
//     evt.preventDefault();
//     console.log('login ', this.user);
//     this.loginSubscription = this.LoginService.loginUser(this.user).subscribe(
//       (response: User) => {
//         console.log('Korisnik logovan', response);

//         if (response.status === 'BANED') {
//           this.toastr.error('You have been baned');
//           return;
//         } else {
//           localStorage.setItem('loggedUser', JSON.stringify(response));
//           this.LoginService.onUserLoggedIn.next();
//           this.router.navigate(['']);
//         }
//       },
//       (errorResp: any) => {
//         console.log('login error', errorResp.error.errorMessage);
//       }
//     );
//   }
// }
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/User.class';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  user: User = {} as User;
  loginSubscription?: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  ngOnInit(): void {}

  loginUser(evt: any) {
    evt.preventDefault();
    console.log('login', this.user);
    this.loginSubscription = this.loginService.loginUser(this.user).subscribe(
      (response: User) => {
        this.toastr.success('Successfully logged in');
        console.log('Korisnik logovan', response);

        if (response.status === 'BANED') {
          this.toastr.error('You have been baned');
          return;
        } else {
          localStorage.setItem('LoggedUser', JSON.stringify(response));
          this.loginService.onUserLoggedIn.next();
          this.router.navigate(['']);
        }
      },
      (errorResp: any) => {
        console.log('Login error', errorResp.error.errorMessage);
      }
    );
  }
}
function next(
  next: any,
  arg1: (response: User) => void,
  arg2: (errorResp: any) => void
): Subscription {
  throw new Error('Function not implemented.');
}
