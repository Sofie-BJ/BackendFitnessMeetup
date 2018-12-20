import { Injectable } from '@angular/core';
import { User, UsersService } from '../app/api';
import { Observable } from 'rxjs/Observable';
import { FacebookAuthResponse, FbUser } from './Models';
import { NextObserver } from 'rxjs/Observer';

declare const FB
declare const window
var fbIsLoaded = false

//https://github.com/hirenalken/fb-oauth-angularx-seed
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  fbLoginStatus = "";
  response: FacebookAuthResponse;
  fbUser: FbUser;

  constructor(private usersService: UsersService) {
    this.addFacebook();
  }



  public addFacebook() {

    window.fbAsyncInit = function () {
      FB.init({
        appId: '400008297206319',
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      });
      fbIsLoaded = true
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  public checkLoginStatusAction() {
    if (fbIsLoaded == true) {
      FB.getLoginStatus(function (response) {
        console.log(response)
      });
    } else {
      console.log("fb not loaded yet!")
    }
  }

  public getUserID(): string {
    var userid = "";

    if (fbIsLoaded == true) {
      FB.getLoginStatus(function (response) {
        console.log(response);
      });
    } else {
      console.log("fb not loaded yet!")
    }

    return userid;
  }

  logitStatus(): Observable<FacebookAuthResponse> {
    return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {

      FB.getLoginStatus((response: FacebookAuthResponse) => {
        // add logic to store user in localstorage
        this.response = response;
        this.fbLoginStatus = response.status;
        observer.next(this.response);
        observer.complete();
      });
    });
  }


  public loginAction() {
    if (fbIsLoaded == true) {
      var self = this; // Keep the reference
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          FB.api('/me', { fields: 'name, email' }, function (response) {
            console.log('The user was login: ' + response.name + '.' + response.id + '.' + response.email);
            self.postUser(response.id, response.name, response.email)
          });
        } else {
          FB.login(function (response) {
            if (response.authResponse) {
              console.log('Fetchin information.... ');
              FB.api('/me', { fields: 'name, email' }, function (response) {
                console.log("Called in authResponse: " + response.name + '.' + response.id + '.' + response.email)
                self.postUser(response.id, response.name, response.email)
              });
            }
          }, {
              scope: 'email',
              return_scopes: true
            });
        }
      });
    }
  }

  public logoutAction() {
    if (fbIsLoaded == true) {
      if (FB.getAccessToken() != null) {
        FB.logout(function (response) {
          console.log(response)
        });
      } else {
        console.log("you are not logged in to FitnessMeetup")
      }
    }
  }

  public postUser(id, name, email) {
    let user: User = { id: id, name: name, email: email }
    this.usersService.addUser(user).subscribe(value => {
      console.log("AddUser on API was called!")
    });
  }

}
