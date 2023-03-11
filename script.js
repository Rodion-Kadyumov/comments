let comments = [];
loadComments();

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

let btn = document.querySelector('#delete');


function showComments (){
  let commentField = document.getElementById('comment-field');
  let out = '<div>';
  comments.forEach(function(item) {
    out += `<div class="wrap">
    <div class="head">
    <p class="data"><em>${timeConverter(item.time)}</em></p>`;
    out += `<p class="delete" id="delete"><span>X</span></p>
    </div>`;
    out += `<div class="body">
      <p class="name" role="alert"><b><img src="/images/avatar.png" alt="Аатар">${item.name}</b></p>`;
    out += `<p class="commit" role="alert">${item.body}</p>
    </div>`;
    out += `<div class="footer">
        <img src="/images/filled-like.png" alt="">
      </div>
    </div>`;
  });
  out += '</div>'
  commentField.innerHTML = out;
}

btn.addEventListener('click', () => {
  localStorage.removeItem('comments')
})

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

  
// const likeBtn = document.querySelectorAll(".like__btn");
// let likeIcon = document.querySelectorAll("#icon"),
// count = document.querySelectorAll("#count");

// let clicked = false;


// likeBtn.addEventListener("click", () => {
//   if (!clicked) {
//     clicked = true;
//     likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
//     count.textContent++;
//   } else {
//     clicked = false;
//     likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
//     count.textContent--;
//   }
// });