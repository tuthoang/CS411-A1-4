import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserXhr } from '@angular/http';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { AppComponent } from './app.component';
import { SearchTwitterComponent } from './search-twitter/search-twitter.component';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { TwitterLoginComponent } from './twitter-login/twitter-login.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchTwitterComponent,
    SentimentComponent,
    TwitterLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'search-twitter',component: SearchTwitterComponent},
      {path:'sentiment', component: SentimentComponent},
      {path:'twitter-login', component: TwitterLoginComponent}
      ])
  ],
  providers: [    
    {provide: BrowserXhr, useClass:CustExtBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
