(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 9 (Industry, Innovation and Infrastructure)?",
      answers: {
        a: "Protecting the environment at all costs, even if it hinders economic development",
        b: "Focusing on heavy industries in developing countries",
        c: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
        d: "Encouraging a return to traditional manufacturing methods"
      },
      correctAnswer: "c"
    },
    {
      question: "Why is building resilient infrastructure important for achieving SDG 9?",
      answers: {
        a: "It ensures infrastructure can withstand natural disasters and climate change impacts",
        b: "It makes infrastructure more expensive to build",
        c: "It allows for faster construction projects",
        d: "It focuses on building new infrastructure only"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the concept of 'inclusive and sustainable industrialization' within SDG 9?",
      answers: {
        a: "Prioritizing large corporations over small businesses",
        b: "Encouraging industries to relocate to countries with lower environmental regulations",
        c: "Promoting industrial development that benefits all people and minimizes environmental impact",
        d: "Focusing on industries that produce the most pollution"
      },
      correctAnswer: "c"
    },
    {
      question: "How can innovation contribute to achieving SDG 9?",
      answers: {
        a: "By developing new ways to exploit natural resources",
        b: "By creating new products regardless of their environmental impact",
        c: "By focusing on short-term technological solutions",
        d: "By developing technologies that are more efficient and sustainable"
      },
      correctAnswer: "d"
    },
    {
      question: "Why is promoting research and development (R&D) crucial for SDG 9?",
      answers: {
        a: "It allows businesses to develop new marketing strategies",
        b: "It can lead to advancements in clean technologies and infrastructure solutions",
        c: "It encourages competition between companies",
        d: "R&D is too expensive for developing countries"
      },
      correctAnswer: "b"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 9?",
      answers: {
        a: "Support businesses that use sustainable practices and invest in green technologies",
        b: "Dispose of electronics irresponsibly",
        c: "Only buy the latest technology, regardless of its energy efficiency",
        d: "All of the above"
      },
      correctAnswer: "a"
    },
    {
      question: "SDG 9 is interconnected with other SDGs. How does sustainable industrialization impact poverty reduction?",
      answers: {
        a: "It creates more competition for jobs",
        b: "It has no impact on poverty",
        c: "It promotes fair labor practices and decent work, which can lift people out of poverty",
        d: "It can create new job opportunities, especially in developing countries"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the estimated global infrastructure investment gap (trillions of dollars) needed annually to achieve SDG 9 by 2030?",
      answers: {
        a: "1",
        b: "3.7",
        c: "5",
        d: "We don't have this data"
      },
      correctAnswer: "b"
    },
    {
      question: "According to the UNIDO website, what percentage of global manufacturing value-added comes from developing countries (as of 2022)?",
      answers: {
        a: "10%",
        b: "30%",
        c: "50%",
        d: "There is no data available"
      },
      correctAnswer: "b"
    },
    {
      question: "SDG 9 emphasizes international cooperation for industrial development. Why is this collaboration important?",
      answers: {
        a: "Countries should compete for resources",
        b: "It allows developed countries to outsource pollution to developing countries",
        c: "Sharing knowledge and technology can accelerate progress for all",
        d: "Each country should focus on its own industrial development goals"
      },
      correctAnswer: "c"
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
