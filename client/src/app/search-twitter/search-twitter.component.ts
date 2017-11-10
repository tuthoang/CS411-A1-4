import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'search-twitter',
  templateUrl: './search-twitter.component.html',
  styleUrls: ['./search-twitter.component.css']
})
export class SearchTwitterComponent{  
  constructor(public http : Http){}
  onSubmit(form: NgForm){
    // this.http.get('http://localhost:3000/api/search',
    //   JSON.stringify(searchedUser));
    this.http.post('http://localhost:3000/api/search', form.value).subscribe();

    // console.log(searchedUser);
  }
}
