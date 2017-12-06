import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogoutComponent  {

  constructor(private auth: AuthService, public http:HttpClient) { }

  logout(){
    this.auth.logout();
  }
  myinfo(){
    this.http.get('/auth/secret').subscribe();
  }
}
