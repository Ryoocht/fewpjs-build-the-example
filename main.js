// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#modal").setAttribute("class", "hidden");
  const likes = document.getElementsByClassName("like-glyph")
  for (const like of likes) {
    like.addEventListener("click", likedEvent)
  }
});

function likedEvent(event) {
  let heart = event.target;
  if (heart.innerHTML == EMPTY_HEART) {
    mimicServerCall()
    .then(resolve => {
      heart.innerHTML = FULL_HEART;
      heart.setAttribute("class", "activated-heart like-glyph");
    })
    .catch(reject => {
      const modal = document.getElementById("modal");
      modal.innerHTML = "Server failed";
      modal.removeAttribute("class", "hidden");
      setTimeout(() => modal.setAttribute("class", "hidden"), 5000);
    })
  } else {
    heart.innerHTML = EMPTY_HEART;
    heart.removeAttribute('class', 'activated-heart');
  }
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
