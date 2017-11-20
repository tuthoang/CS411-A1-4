import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'search-twitter',
  templateUrl: './search-twitter.component.html',
  styleUrls: ['./search-twitter.component.css']
})
export class SearchTwitterComponent{  
  constructor(public http : HttpClient){}
  onSubmit(form: NgForm){
    // this.http.get('http://localhost:3000/api/search',
    //   JSON.stringify(searchedUser));
    // this.http.post('http://localhost:3000/api/search', form.value).subscribe();
    console.log(form.value.searchBar);
    let params= new HttpParams();
    params = params.append('searchBar', form.value.searchBar);
    this.http.get('http://localhost:3000/api/search', {
      params: params
    }).subscribe();

    // console.log(searchedUser);
  }
}
