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
      for(let tweet of this.tweetsList){
        // console.log(JSON.stringify(tweet));
        this.twitterService.sentimentAnalysis(tweet.text).subscribe(data => {
          console.log(data);
          this.sentimentsList.push(data);
          // console.log(data);
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
