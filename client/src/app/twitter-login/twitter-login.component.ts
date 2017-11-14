import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'twitter-login',
  templateUrl: './twitter-login.component.html',
  styleUrls: ['./twitter-login.component.css']
})
export class TwitterLoginComponent {

  constructor(public http : Http){}

  myEvent() {
    this.http.get('http://localhost:3000/api/me').subscribe();
  }
}
