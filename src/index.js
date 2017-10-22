var textBox = document.getElementById('searchBar');

textBox.onkeydown = function(){
  console.log(document.getElementById('searchValue').value)
  document.getElementById('searchValue').innerText = textBox.value;
}

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.twitter.com/1.1/search/tweets.json?q=perrydBUCS",
  "method": "GET",
  "headers": {
    "authorization": "OAuth oauth_consumer_key=\\\"WzM6h1iT1rHRhVgc9ImK0Vgkr\\\",oauth_token=\\\"922210630488162304-Eq6zvI60eluRfrvRhhFl65lFhaKEGY7\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1508710126\\\",oauth_nonce=\\\"fmbZkclBKaE\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"CbV%2FU0da3YDDWSz%2BnFunTS3Tqeo%3D\\\"",
    "cache-control": "no-cache",
    "postman-token": "b94e9264-2219-3223-6ea2-578b37e6c2a1"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
