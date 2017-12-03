import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { TwitterUserService } from '../twitter-user.service';
@Component({
  selector: 'search-twitter',
  templateUrl: './search-twitter.component.html',
  styleUrls: ['./search-twitter.component.css']
})
export class SearchTwitterComponent{

  usersList: any = null;
  tweetsList: any = null;
  sentimentsList: Array<any> = [];
  constructor(private twitterService : TwitterUserService, public http : HttpClient){}

  onSubmit(form : NgForm) {
    this.twitterService.getTwitterHandle(form).subscribe(data=> {
      this.usersList = data;
    });
    console.log('submitted');
  }


  public open(event, item){
    console.log("getting tweets now");
    this.twitterService.getTweets(item).subscribe(data => {
      this.tweetsList = data;
      // console.log(this.tweetsList[0].text);
    // for(let tweet of this.tweetsList){
    //   console.log(tweet.text);
    // }
      this.sentimentsList = [];
      for(let tweet of this.tweetsList){
        console.log(tweet.full_text);
        this.twitterService.sentimentAnalysis(tweet.full_text).subscribe(data => {
          console.log(data);
          var maxVal = 0;
          var bestGuess = "temp";
          var temp = JSON.parse(JSON.stringify(data));
          var keys = Object.keys(temp);

          for (var i = 0; i < keys.length; i++){
            var key = keys[i];
            if(maxVal < temp[key]){
                maxVal = temp[key];
                bestGuess = key;
            }
          }
          this.sentimentsList.push(bestGuess);
        })
      }
    });

  }


  // // Move all of this into Service ?
  // usersList: any = null;
  // constructor(public http : HttpClient){}


  // onSubmit(form: NgForm){
  //   interface twitterUsers {
  //     data: Array<any>
  //   }
  //   let params = new HttpParams();
  //   params = params.append('searchBar', form.value.searchBar);
  //   this.http.get<twitterUsers>('http://localhost:3000/api/search', {
  //     params: params
  //   }).subscribe(
  //   data => {
  //     this.usersList = data;
  //     console.log("first relevant search:" + data[0].id);
  //     console.log(data[0].screen_name);
  //     console.log("second relevant search:" + data[1].id);
  //     console.log(data[1].screen_name);
  //   });
  //
  //   console.log(searchedUser);
  // }
}
