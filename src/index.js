var textBox = document.getElementById('searchBar');

textBox.onkeydown = function(){
  console.log(document.getElementById('searchValue').value)
  document.getElementById('searchValue').innerText = textBox.value;
}
