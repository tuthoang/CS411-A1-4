import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordValidation } from './password-validation.validator';

@Component({
  selector: 'greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GreetingComponent  {

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  email:string = '';
  password:string = '';
  confirmPassword:string = '';
  emailError:string = 'Enter a valid email';
  passwordError:string = 'Enter a password of atleast 5 characters';
  mismatch:string = 'Passwords dont match';
  matchPW: boolean = false;
  emailFocus: boolean = false;

  constructor(private auth: AuthService,private fb: FormBuilder, public http: HttpClient){
    this.rForm = fb.group({
      'email' : [null, Validators.compose([Validators.email,Validators.required])],
      'password' : [null, Validators.compose([Validators.required,Validators.minLength(5)])],
      'confirmPassword' : [null, Validators.compose([Validators.required,Validators.minLength(5)])]
      },
      {
      validator: PasswordValidation.MatchPassword // custom validation method
    });
  }
  Register(form) {
    this.email = form.email;
    this.password = form.password;
    this.confirmPassword = form.confirmPassword;
    if(this.password == this.confirmPassword) this.matchPW = true;
    
    this.http.post('/auth/create', form).subscribe();
  }  
  Login(form:NgForm){
    if(form.value. email && form.value.password)
      this.auth.login(form.value);
  }

}
