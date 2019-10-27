import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GoogleLoginProvider} from "angularx-social-login";

import { AppComponent } from './app.component';
import { GoogleSignInComponent } from './sign-in/google-sign-in/google-sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';

//Services
import { ChecklistService } from './services/checklist.service';
import { NewChecklistComponent } from './new-checklist/new-checklist.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("150655672387-f5k27ot2cur0anfnk40vm4tunff268e2.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInComponent,
    HomeComponent,
    SignInComponent,
    NewChecklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig,    
  },
  ChecklistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
