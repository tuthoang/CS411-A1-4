import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {

  constructor(public http : Http){}
  onSubmit(form:NgForm){

    //form.value sends the whole json object
    console.log(form.value);
    console.log(form.value.sentimentBar);

    //API call with the form data
    this.http.post('http://localhost:3000/api/sentiment', form.value).subscribe();

    // console.log(searchedUser);
  }

}
