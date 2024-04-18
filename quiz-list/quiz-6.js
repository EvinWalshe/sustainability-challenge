(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 6 (Clean Water and Sanitation)?",
      answers: {
        a: "Ensure availability and sustainable management of water and sanitation for all",
        b: "Building more public toilets",
        c: "Providing bottled water to all people in need",
        d: "Reducing pollution in rivers only"
      },
      correctAnswer: "a"
    },
    {
      question: "By what year does SDG 6 aim to achieve universal and equitable access to safe and affordable drinking water for all?",
      answers: {
        a: "2020 (we've already missed it)",
        b: "2030",
        c: "2040",
        d: "There is no deadline"
      },
      correctAnswer: "b"
    },
    {
      question: "According to UNICEF, how many people globally lack access to safely managed sanitation facilities (as of 2023)?",
      answers: {
        a: "1 billion",
        b: "3.6 billion",
        c: "4 billion",
        d: "We don't have this data"
      },
      correctAnswer: "b"
    },
    {
      question: "In the process of wastewater treatment, what kind of contamination is the most difficult to purify?",
      answers: {
        a: "Gases",
        b: "Bacteria",
        c: "Solids",
        d: "Chemicals"
      },
      correctAnswer: "d"
    },
    {
      question: "SDG 6 emphasizes sustainable water management. What does this include?",
      answers: {
        a: "Withdrawing as much water as possible from sources",
        b: "Building more dams regardless of environmental impact",
        c: "Only focusing on treating wastewater",
        d: "Conserving water and using it efficiently"
      },
      correctAnswer: "d"
    },
    {
      question: "In 2022, how many people still lacked safely managed drinking water services?",
      answers: {
        a: "1.5 Billion",
        b: "1.8 Billion",
        c: "2.2 Billion",
        d: "2.6 Billion"
      },
      correctAnswer: "c"
    },
    {
      question: "SDG 6 recognizes the link between sanitation and hygiene. Why is good hygiene important?",
      answers: {
        a: "It makes showers more enjoyable",
        b: "It reduces the need for laundry services",
        c: "It helps prevent the spread of diseases",
        d: "It improves the smell of communities"
      },
      correctAnswer: "c"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 6?",
      answers: {
        a: "Only take short showers",
        b: "Ignore water conservation efforts",
        c: "All of the above",
        d: "(Taking short showers, fixing leaky faucets, and advocating for water conservation policies)"
      },
      correctAnswer: "c"
    },
    {
      question: "Why is SDG 6 considered essential for achieving other Sustainable Development Goals?",
      answers: {
        a: "Clean water and sanitation are fundamental for good health and well-being",
        b: "Sanitation improves mobile phone reception",
        c: "Clean water makes crops grow faster",
        d: "Having access to toilets creates more jobs"
      },
      correctAnswer: "a"
    },
    {
      question: "What percentage of the global population has access to basic drinking water services (as of 2023)?",
      answers: {
        a: "30%",
        b: "70%",
        c: "90%",
        d: "We don't have this data"
      },
      correctAnswer: "b"
    }
  ]
  ;

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
