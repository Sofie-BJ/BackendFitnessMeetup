import { Component, OnInit, Injectable } from '@angular/core';
import { User, UsersService } from '../api';
import { LoginService } from '../login.service';

declare const FB
declare const window
var fbIsLoaded = false

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService, LoginService]
})

export class LoginComponent {

  constructor(private usersService: UsersService, private loginService: LoginService) {
  }

  public loginAction() {
    this.loginService.loginAction();
  }

  public logoutAction() {
    this.loginService.logoutAction();
  }

  public checkLoginStatusAction() {
    this.loginService.checkLoginStatusAction();
  }

}
