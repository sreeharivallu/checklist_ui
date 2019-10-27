import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Router} from "@angular/router"


@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {

  user: SocialUser;
  
  constructor(private authService: AuthService, 
              private http: HttpClient,
              private router: Router) { }
  

  sendToRestApiMethod(token: string) : void{
    this.http.post("http://localhost:3000/google-signin",
       {
          token: token
       }
    ).subscribe(
       onSuccess => {
          //login was successful
          //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
          console.log('success');
          this.router.navigate(['/home'])
       }, onFail => {
          //login was unsuccessful
          //show an error message
          console.log('failed', onFail);
       }
    );
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

  }

  signInWithGoogle(): void {
    console.log('Signin with google', GoogleLoginProvider.PROVIDER_ID);
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((userData) => {
      console.log('userData is',userData);
      //on success
      //this will return user data from google. What you need is a user token which you will send it to the server
      this.sendToRestApiMethod(userData.idToken);
   }).catch(err => {
     console.log(err);
   });
  }

  signOut(): void {
    this.authService.signOut();
  }

}
