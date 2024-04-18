
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("main").style.marginLeft = "100%";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

// Flip Card Javasript element

function flipCard(element) {
  var cardInner = element.querySelector('.flip-card-inner');
  cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

// Fade Cards
function fadeIn(element) {
  var back = element.querySelector('.fade-card-back');
  back.style.opacity = 1;
}

function fadeOut(element) {
  var back = element.querySelector('.fade-card-back');
  back.style.opacity = 0;
}

// SDG UN Website link functions

function redirectToGoal(goalNumber) {
  window.location.href = `https://sdgs.un.org/goals/goal${goalNumber}`;
}

    function navigateTo(page) {
        window.location.href = page;
    }
