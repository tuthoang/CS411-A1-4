import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {

  constructor(private auth: AuthService){}
  onSubmit(form:NgForm){
    // console.log(form.value);
    // interface JSONdata{
    //     success: boolean, 
    //     message: string, 
    //     token: string
    // }
    if(form.value. email && form.value.password)
      this.auth.login(form.value);
    //API call with the form data
    // this.http.post<JSONdata>('/auth/login', form.value).subscribe(
    //   data =>{
    //     console.log(data);
    //     // let headers = new Headers();
    //     // headers.append('Authorization', data.token);
    //     // headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    //   }
    // );

  }
}
