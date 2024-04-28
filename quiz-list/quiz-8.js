(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 8 (Decent Work and Economic Growth)?",
      answers: {
        a: "Increase economic growth regardless of social costs",
        b: "Create more jobs, even if they are low-quality",
        c: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
        d: "Focus on economic growth in developed countries only"
      },
      correctAnswer: "c"
    },
    {
      question: "According to the International Labour Organization (ILO), what is the global youth unemployment rate (as of 2023)?",
      answers: {
        a: "3%",
        b: "13.6%",
        c: "25%",
        d: "We don't have this data"
      },
      correctAnswer: "b"
    },
    {
      question: "What is a key challenge to achieving SDG 8, especially in developing countries?",
      answers: {
        a: "Lack of access to education",
        b: "Shortage of natural resources",
        c: "Informal work with no labor protections",
        d: "Over-regulation of businesses"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the concept of 'decent work' within SDG 8?",
      answers: {
        a: "Any job that pays a minimum wage",
        b: "Work that is temporary or short-term",
        c: "Work that is safe, fair, and provides adequate income and security",
        d: "Working long hours to achieve economic growth"
      },
      correctAnswer: "c"
    },
    {
      question: "SDG 8 emphasizes promoting gender equality in the workplace. Why is this important?",
      answers: {
        a: "Women are better at certain jobs",
        b: "Men are the primary breadwinners in most families",
        c: "Women should focus on childcare",
        d: "Gender equality leads to a more diverse and productive workforce"
      },
      correctAnswer: "d"
    },
    {
      question: "How can technological advancements impact jobs in the future according to SDG 8?",
      answers: {
        a: "They will eliminate the need for all human jobs",
        b: "New skills will be required for emerging job markets",
        c: "There will be a need for investment in retraining programs",
        d: "Technology will make all jobs easier"
      },
      correctAnswer: "b"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 8?",
      answers: {
        a: "Only buy products from companies with perfect labor records",
        b: "Disregard working conditions in your community",
        c: "Support businesses that promote fair labor practices",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Why is SDG 8 considered crucial for achieving other Sustainable Development Goals?",
      answers: {
        a: "Economic growth leads to more traffic congestion",
        b: "More jobs create more pollution",
        c: "Poverty reduction is a key target within SDG 8, which is linked to many other challenges",
        d: "A strong economy allows for investment in social programs like education and healthcare"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the estimated global growth rate needed to achieve the goals of SDG 8 by 2030 (approximately)?",
      answers: {
        a: "1%",
        b: "7%",
        c: "10%",
        d: "There is no specific target"
      },
      correctAnswer: "b"
    },
    {
      question: "SDG 8 highlights the importance of promoting sustainable consumption and production patterns. Why is this important for economic growth?",
      answers: {
        a: "It promotes resource efficiency and reduces waste, which can save businesses money",
        b: "It reduces the availability of resources for businesses",
        c: "It encourages people to buy more goods",
        d: "It slows down economic development"
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
