var textBox = document.getElementById('searchBar');

var settings = {
"async": true,
"crossDomain": true,
"url": "https://api.twitter.com/1.1/search/tweets.json?q=perrydBUCS",
"method": "GET",
"headers": {
  "authorization": "OAuth oauth_consumer_key=\\\"WzM6h1iT1rHRhVgc9ImK0Vgkr\\\",oauth_token=\\\"922210630488162304-Eq6zvI60eluRfrvRhhFl65lFhaKEGY7\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1508712176\\\",oauth_nonce=\\\"shUusrE20MZ\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"03mQzKg%2FpzJWIzNcstNfvzyKQOA%3D\\\"",
  "cache-control": "no-cache",
  "postman-token": "69b9398d-a3c2-0fbd-5c09-ae54605af94b"
}
}

$.ajax(settings).done(function (response) {
console.log(response);
});

// var data = null;
//
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });
//
// xhr.open("GET", "https://api.twitter.com/1.1/search/tweets.json?q=perrydBUCS");
// xhr.setRequestHeader("authorization", "OAuth oauth_consumer_key=\\\"WzM6h1iT1rHRhVgc9ImK0Vgkr\\\",oauth_token=\\\"922210630488162304-Eq6zvI60eluRfrvRhhFl65lFhaKEGY7\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1508712176\\\",oauth_nonce=\\\"shUusrE20MZ\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"03mQzKg%2FpzJWIzNcstNfvzyKQOA%3D\\\"");
// xhr.setRequestHeader("cache-control", "no-cache");
// xhr.setRequestHeader("postman-token", "a30a1a29-0721-f58e-6e53-e272597cdd20");
//
// xhr.send(data);

// textBox.onkeydown = function(){
//
// }
