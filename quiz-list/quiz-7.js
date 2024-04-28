(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 7 (Affordable and Clean Energy)?",
      answers: {
        a: "Ensure access to affordable, reliable, sustainable and modern energy for all",
        b: "Encouraging the use of traditional fossil fuels",
        c: "Expanding access to electricity in developed countries",
        d: "Increasing nuclear power plants globally"
      },
      correctAnswer: "a"
    },
    {
      question: "According to the World Bank, how many people globally lacked access to electricity in 2020 (approximately)?",
      answers: {
        a: "100 million",
        b: "500 million",
        c: "770 million",
        d: "820 Million"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of the following is a renewable energy source?",
      answers: {
        a: "Coal",
        b: "Oil",
        c: "Natural gas",
        d: "Solar power"
      },
      correctAnswer: "d"
    },
    {
      question: "Why is promoting renewable energy important for achieving SDG 7?",
      answers: {
        a: "They are cheaper to transport",
        b: "They are easier to store",
        c: "They are less harmful to the environment",
        d: "They produce more energy overall"
      },
      correctAnswer: "c"
    },
    {
      question: "What is energy efficiency, and why is it important for SDG 7?",
      answers: {
        a: "Using more power plants regardless of efficiency",
        b: "Finding new sources of energy even if they are wasteful",
        c: "Using less energy to achieve the same outcome",
        d: "Only focusing on providing the bare minimum amount of energy"
      },
      correctAnswer: "c"
    },
    {
      question: "How much percentage of electricity is powered by renewable sources?",
      answers: {
        a: "30%",
        b: "40%",
        c: "50%",
        d: "60%"
      },
      correctAnswer: "a"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 7?",
      answers: {
        a: "Only use appliances with the highest energy ratings",
        b: "Ignore energy conservation efforts",
        c: "Using energy-efficient appliances, turning off lights when not in use, and supporting policies for renewable energy",
        d: "All of the above"
      },
      correctAnswer: "d"
    },
    {
      question: "SDG 7 is linked to other Sustainable Development Goals. How does access to clean energy impact public health?",
      answers: {
        a: "It makes hospitals more crowded",
        b: "It reduces air pollution, improving respiratory health",
        c: "It allows for better food refrigeration, reducing spoilage",
        d: "There is no connection"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the estimated global investment needed annually to achieve universal access to affordable and clean energy by 2030 (in trillions)?",
      answers: {
        a: "1",
        b: "1.2",
        c: "2",
        d: "There is no estimated cost"
      },
      correctAnswer: "b"
    },
    {
      question: "The rapid development of renewable energy technologies is a key aspect of achieving SDG 7. Why is this important?",
      answers: {
        a: "It can make renewable energy more affordable and accessible",
        b: "It allows for continued reliance on fossil fuels",
        c: "New technologies are always more expensive",
        d: "We should focus on improving existing technologies only"
      },
      correctAnswer: "a"
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
