import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation.validator';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  email:string = '';
  password:string = '';
  confirmPassword:string = '';
  emailError:string = 'Enter a valid email';
  passwordError:string = 'Enter a password of at least 5 characters';
  mismatch:string = 'Passwords do not match';
  matchPW: boolean = false;
  emailFocus: boolean = false;
  pwFocus: boolean = false;
  constructor(private fb: FormBuilder, public http: HttpClient) {
    this.rForm = fb.group({
      'email' : [null, Validators.compose([Validators.email,Validators.required])],
      'password' : [null, Validators.compose([Validators.required,Validators.minLength(5)])],
      'confirmPassword' : [null, Validators.compose([Validators.required,Validators.minLength(5)])],
      validator: PasswordValidation.MatchPassword // custom validation method
      });
    // this.test();
  }
  public test(){
    console.log("pwmatch", this.rForm);
  }


  onSubmit(form) {
    this.email = form.email;
    this.password = form.password;
    this.confirmPassword = form.confirmPassword;
    if(this.password == this.confirmPassword) this.matchPW = true;
    this.http.post('/auth/create', form).subscribe();
  }
  // constructor(private fb: FormBuilder) { // <--- inject FormBuilder
  //   this.createForm();
  // }

  //  ngOnInit(){
  //   this.form = new FormGroup({
  //   email: new FormControl(""),
  //   password: new FormControl("")
  // });
  // }

  // onSubmit(){

  // }


}
