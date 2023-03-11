let comments = [];
loadComments();
// deleteComments();

document.getElementById('comment-add').onclick = function(){
  let commentName = document.getElementById('comment-name');
  let commentBody = document.getElementById('comment-body');

  let comment = {
      name : commentName.value,
      body : commentBody.value,
      time : Math.floor(Date.now() / 1000)
  }

  commentName.value = '';
  commentBody.value = '';

  comments.push(comment);
  saveComments();
  showComments();
}

function saveComments(){
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}

// function deleteComments() {
//   document.getElementById('delete').onclick = function() {
//     delete localStorage('comments')
//   }
// }

function showComments (){
  let commentField = document.getElementById('comment-field');
  let out = '';
  comments.forEach(function(item) {
    out += `<p class="delete"><span id="delete">X</span></p>`;
    out += `<p class="data"><em>${timeConverter(item.time)}</em></p>`;
    out += `<p class="name" role="alert"><b>${item.name}</b></p>`;
    out += `<p class="commit" role="alert">${item.body}</p>`;
  });
  commentField.innerHTML =`<li>${out}</li>`;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }