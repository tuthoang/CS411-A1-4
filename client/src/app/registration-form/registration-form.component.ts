import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  emailError:string = 'Enter a valid email';
  passwordError:string = 'Enter a password of atleast 5 characters';
  constructor(private fb: FormBuilder) { 

    this.rForm = fb.group({
      'email' : [null, Validators.compose([Validators.email,Validators.required])],
      'password' : [null, Validators.compose([Validators.required,Validators.minLength(5)])]
    });

  }  
    onSubmit(form) {
    this.email = form.email;
    this.password = form.password;
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
