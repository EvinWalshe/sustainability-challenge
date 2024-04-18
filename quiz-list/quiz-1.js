(function() {
    const myQuestions = [
      {
        question: "What is the main goal of the first SDG?",
        answers: {
          a: "To end poverty for everyone in the UN",
          b: "To end poverty of all forms, everywhere",
          c: "To end poverty in all third world countries",
          d: "To end poverty for children"
         },
        correctAnswer: "b" 
      
      },
      {
        question: "Which of the following is NOT a factor contributing to poverty?",
        answers: {
          a: "Lack of Educations",
          b: "Economic inequality",
          c: "Overpopulation",
          d: "Access to healthcare"
        },
        correctAnswer: "c"
      },
      {
        question: "Extreme poverty is defined as living on less than:",
        answers: {
          a: "$1 per day",
          b: "$2 per day",
          c: "$4 per day",
          d: "$8 per day"
         
        },
        correctAnswer: "b"
      },
      {
        question: "What region of the world has the highest concentration of people living in extreme poverty?",
        answers: {
          a: "Sub-Saharan Africa",
          b: "South Asia",
          c: "Latin America",
          d: "East Asia and Pacific"
         
        },
        correctAnswer: "a"
      },
       {
        question: "If current trends are to continue, how many estimated people will be still living in extreme poverty by 2030?",
        answers: {
          a: "575 Million",
          b: "615 Million",
          c: "825 Million",
          d: "1 Billion"
         
        },
        correctAnswer: "a"
      },
       {
        question: "How many people, as of 2020, are currently living in poverty?",
        answers: {
          a: "415 Million",
          b: "500 Million",
          c: "650 Million",
          d: "725 Million",
         
        },
        correctAnswer: "d"
      },
       {
        question: "If current trends continue, how many countries will have halved their national poverty?",
        answers: {
          a: "All",
          b: "1 in 2",
          c: "1 in 3",
          d: "1 in 4"
         
        },
        correctAnswer: "c"
      },
       {
        question: "The average life expectancy of Ireland is over 80 years old. What is the life expectancy of someone living in Nigeria", // https://www.worlddata.info/life-expectancy.php
        answers: {
          a: "75",
          b: "68",
          c: "60",
          d: "52"
         
        },
        correctAnswer: "d"
      },
       {
        question: "Which of the following is a sustainable solution to ending poverty?",
        answers: {
          a: "Short-term aid programs",
          b: "Empowering women and girls",
          c: "Encouraging foreign investment without regulation",
          d: "Increasing tariffs on imported goods"
         
        },
        correctAnswer: "b"
      },
       {
        question: "What role does education play in combating poverty?",
        answers: {
          a: "Education has no impact on poverty rates",
          b: "Education increases the likelihood of finding employment",
          c: "Education only benefits wealthy individuals",
          d: "Education decreases access to healthcare"
         
        },
        correctAnswer: "a"
      },
      
    ];
  
    function getRandomSubset(array, size) {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, size);
  }

  function buildQuiz() {
      const randomQuestions = getRandomSubset(myQuestions, 5); // Get 5 random questions
      const output = [];

      randomQuestions.forEach((currentQuestion, questionNumber) => {
          const answers = [];

          for (letter in currentQuestion.answers) {
              answers.push(
                  `<label>
                      <input type="radio" name="question${questionNumber}" value="${letter}">
                      ${letter} :
                      ${currentQuestion.answers[letter]}
                  </label>`
              );
          }

          output.push(
              `<div class="slide">
                  <div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>
              </div>`
          );
      });

      quizContainer.innerHTML = output.join("");
  }
  
  
  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;

    myQuestions.slice(0, 5).forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = "darkgreen";
        } else {
            answerContainers[questionNumber].style.color = "red";
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of 5`;
}

  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
