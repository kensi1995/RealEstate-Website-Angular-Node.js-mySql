import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.class';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {} as User;
  textInputErr: boolean = false;
  passwordInputErr: boolean = false;
  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  registerUser(evt: any) {
    evt.preventDefault();
    if (this.user.firstName === undefined || this.user.firstName.length < 2) {
      this.textInputErr = true;
      return;
    }

    if (this.user.password === undefined || this.user.password.length < 6) {
      this.passwordInputErr = true;
      return;
    }

    console.log('register user', this.user);
    this.registerService.registerUser(this.user).subscribe((response: any) => {
      this.toastr.success(response);
      this.router.navigateByUrl('user/login');
    });
  }
}
