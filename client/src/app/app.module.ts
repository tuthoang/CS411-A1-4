import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserXhr } from '@angular/http';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { AppComponent } from './app.component';
import { SearchTwitterComponent } from './search-twitter/search-twitter.component';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TwitterLoginComponent } from './twitter-login/twitter-login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TwitterUserService } from './twitter-user.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component'
import { AuthInterceptor } from './auth-interceptor';
import { AuthService } from './auth.service';
import { GreetingComponent } from './greeting/greeting.component';
import {ChartModule} from 'primeng/primeng';
import {RouteGuard} from './route-guard';
@NgModule({
  declarations: [
    AppComponent,
    SearchTwitterComponent,
    SentimentComponent,
    TwitterLoginComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    LogoutComponent,
    GreetingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ChartModule,

    RouterModule.forRoot([
      {path:'', component: GreetingComponent},
      // {path:'', redirectTo:'/greeting', pathMatch:'full'},
      {path:'home', component: SearchTwitterComponent,pathMatch: 'full', canActivate:[RouteGuard]},
      {path:'**', component:GreetingComponent}

      ])
  ],
  providers: [    
    {provide: BrowserXhr, useClass:CustExtBrowserXhr},
    TwitterUserService,
    AuthService,
    RouteGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
