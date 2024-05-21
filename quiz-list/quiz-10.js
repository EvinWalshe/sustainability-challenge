(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG #10?",
      answers: {
        a: "Reducing income inequality within countries",
        b: "Promoting economic growth for all nations",
        c: "Addressing global climate change",
        d: "Ensuring access to clean drinking water"
      },
      correctAnswer: "a"
    },
    {
      question: "According to SDG #10, which of the following groups is most vulnerable to inequality?",
      answers: {
        a: "Men",
        b: "Women",
        c: "Urban populations",
        d: "Developed nations"
      },
      correctAnswer: "b"
    },
    {
      question: "What does the term 'income inequality' refer to within SDG #10?",
      answers: {
        a: "The gap between the richest and poorest individuals",
        b: "The cost of living in different regions",
        c: "The difference in average income between countries",
        d: "The national debt of a country"
      },
      correctAnswer: "a"
    },
    {
      question: "SDG #10 promotes progressive taxation. What does this mean?",
      answers: {
        a: "A flat tax rate for all income levels",
        b: "Eliminating all forms of taxation",
        c: "Tax breaks for businesses that create jobs",
        d: "Higher tax rates for those with higher incomes"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is NOT a target within SDG #10?",
      answers: {
        a: "Adopt policies that progressively reduce inequality",
        b: "Empower and promote the social, economic, and political inclusion of all",
        c: "Regulate financial markets and institutions",
        d: "Ensure equal opportunity and eliminate discrimination"
      },
      correctAnswer: "c"
    },
    {
      question: "How can technological advancements contribute to reducing inequality according to SDG #10?",
      answers: {
        a: "By automating jobs and replacing human labor",
        b: "By providing access to education and information for all",
        c: "By creating a digital divide between rich and poor nations",
        d: "By increasing the cost of living"
      },
      correctAnswer: "b"
    },
    {
      question: "Human rights are...",
      answers: {
        a: "Rights that vary from person to person depending on person's religion, culture, and place of origin",
        b: "Rights inherent to all human beings, regardless of race, sex, nationality, ethnicity, language, religion, or any other status",
        c: "Fundamental rights stating that humans are entitled to use all resources of the planet to their advantage as much as they want",
        d: "All of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following statements is NOT a correct description of Fair Trade?",
      answers: {
        a: "Fair Trade defines a trade partnership based on dialogue, transparency, respect and fairness in international trade.",
        b: "Fair Trade means changing practices in the supply chain, from production to the sale of the product.",
        c: "Fair Trade is a tangible contribution to the fight against poverty, climate change and the economic crisis.",
        d: "Fair Trade means paying wages from the developed world in the developing countries"
      },
      correctAnswer: "d"
    },
    {
      question: "What individual action can MOST contribute to reducing inequality in your community?",
      answers: {
        a: "Shopping at local businesses only",
        b: "Advocating for policies that promote equal opportunity",
        c: "Volunteering your time to a charity",
        d: "Reducing your overall consumption"
      },
      correctAnswer: "b"
    },
    {
      question: "____ people worldwide has experienced discrimination in some form, with women and people with disabilities disproportionately affected.",
      answers: {
        a: "1 in 3",
        b: "1 in 6",
        c: "1 in 8",
        d: "1 in 10"
      },
      correctAnswer: "b"
    }
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
    const correctAnswer = currentQuestion.correctAnswer;

    // Loop through all answers and mark correct answer in green
    for (letter in currentQuestion.answers) {
      const answerElement = answerContainer.querySelector(`input[value=${letter}]`).parentNode;
      if (letter === correctAnswer) {
        answerElement.style.color = "green"; // Mark correct answer in green
      } else {
        answerElement.style.color = ""; // Reset color for incorrect answers
      }
    }

    if (userAnswer === correctAnswer) {
      numCorrect++;
    } else {
      if (userAnswer) {
        const userAnswerElement = answerContainer.querySelector(`input[value=${userAnswer}]`).parentNode;
        userAnswerElement.style.color = "red"; // Highlight incorrect user answer in red
      }
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
