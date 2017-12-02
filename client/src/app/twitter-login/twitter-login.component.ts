import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'twitter-login',
  templateUrl: './twitter-login.component.html',
  styleUrls: ['./twitter-login.component.css']
})
export class TwitterLoginComponent {

  constructor(public http : HttpClient){}

  myEvent() {
    this.http.get('/auth/me').subscribe();
  }
}
