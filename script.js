const userName = document.querySelector('#comment-name');
const userCommit = document.querySelector('#comment-body');
const addBtn = document.querySelector('#comment-add');
const list = document.querySelector('.container ul');
const data = Math.floor(Date.now() / 1000);
const enter = 'Enter';

addBtn.addEventListener('click', (e) => {
  if(userName.value != '' & userCommit.value != '') {
    e.preventDefault();
    const li = document.createElement('li');
    const head = document.createElement('p');
    head.classList.add('head');
    head.innerHTML = userName.value + ' ' + timeConverter(data);
    const body = document.createElement('p');
    body.classList.add('content');
    body.innerHTML = userCommit.value;
    li.appendChild(head);
    li.appendChild(body);
    list.appendChild(li);

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('heart-button');
    const likeFlip = document.createElement('div');
    likeFlip.classList.add('heart-flip');
    likeBtn.appendChild(likeFlip);
    li.appendChild(likeBtn);

    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = 'Удалить комментарий';
    li.appendChild(deleteBtn);
  }

  document.querySelectorAll('.heart-button').forEach(button => button.addEventListener('click', (e) => {
    button.classList.toggle('active')
  }));

  const close = document.querySelectorAll('span');
  for(let i = 0; i < close.length; i++) {
    close[i].addEventListener('click', ()=> {
      close[i].parentElement.style.opacity = 0;
      setTimeout(() => {
        close[i].parentElement.style.display = 'none';
        close[i].parentElement.remove();
      }, 500);
    })
  }
  userName.value = '';
  userCommit.value = '';
})

userCommit.addEventListener("keypress", (e) => {
  if (e.code === enter) {
    e.preventDefault();
    addBtn.click();
  }
});


const userCommitLimit = userCommit.getAttribute('maxlength');
const txtCounter = document.querySelector('.textarea__count span');
txtCounter.innerHTML = userCommitLimit;

userCommit.addEventListener("keyup", txtSetCounter);
userCommit.addEventListener("keydown", function (event) {
	if (event.repeat) txtSetCounter();
});

function txtSetCounter() {
	const txtCounterResult = userCommitLimit - userCommit.value.length;
	txtCounter.innerHTML = txtCounterResult;
}

function timeConverter(UNIX_timestamp){
  const a = new Date(UNIX_timestamp * 1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  if (date === date) {
    return 'Сегодня' + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  } else if (date == date - 1) {
    return 'Вчера' + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  } else {
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  }
}