import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {

  constructor(public http : HttpClient){}
  onSubmit(form:NgForm){

    //form.value sends the whole json object
    let params= new HttpParams();
    params = params.append('sentimentBar', form.value.sentimentBar);
    //API call with the form data
    this.http.get('http://localhost:3000/api/sentiment', {
      params: params
    }).subscribe();
  }

}
