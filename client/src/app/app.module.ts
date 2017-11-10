import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchTwitterComponent } from './search-twitter/search-twitter.component';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchTwitterComponent,
    SentimentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'search-twitter',component: SearchTwitterComponent},
      {path:'sentiment', component: SentimentComponent}
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
