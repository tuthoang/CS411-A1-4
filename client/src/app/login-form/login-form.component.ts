import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {

  constructor(public http : HttpClient){}
  onSubmit(form:NgForm){
    console.log(form.value);
    //API call with the form data
    this.http.post('/api/login', form.value).subscribe();

  }
}
