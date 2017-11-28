import { Injectable } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { SearchTwitterComponent } from './search-twitter/search-twitter.component'
@Injectable()
export class TwitterUserService {
  // usersList: any = null;
  // constructor(public twitterUsers: SearchTwitterComponent) {
  //   this.usersList = twitterUsers.usersList;
  //  }
  // getTwitterUsers(){
  //   return this.usersList;
  // }

  usersList: any = null;
  constructor(public http : HttpClient){}


  sendData(form: NgForm){
    interface twitterUsers {
      data: Array<any>
    }
    let params = new HttpParams();
    params = params.append('searchBar', form.value.searchBar);
    return this.http.get<twitterUsers>('http://localhost:3000/api/search', {
      params: params
    });
    // .subscribe(
    // data => {
    //   this.usersList = data;
    //   // console.log("first relevant search:" + data[0].id);
    //   // console.log(data[0].screen_name);
    //   // console.log("second relevant search:" + data[1].id);
    //   // console.log(data[1].screen_name);
    // });
    // return this.usersList;
  }
}
