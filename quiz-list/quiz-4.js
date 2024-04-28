(function () {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 4 (Quality Education)?",
      answers: {
        a: "Providing free textbooks to all students",
        b: "Increasing school building construction",
        c: "Ensuring inclusive and equitable quality education for all",
        d: "Reducing school dropout rates only for girls"
      },
      correctAnswer: "c"
    },
    {
      question: "According to UNESCO, how many more teachers are needed globally to achieve universal primary and secondary education by 2030 (approximately)?",
      answers: {
        a: "10 million",
        b: "69 million",
        c: "94 million",
        d: "We already have enough teachers"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following is NOT a target within SDG 4?",
      answers: {
        a: "Eliminate gender disparity in education",
        b: "Ensure all youth and adults achieve literacy and numeracy",
        c: "Increase the number of universities worldwide",
        d: "Standardize national curriculums across all countries"
      },
      correctAnswer: "d"
    },
    {
      question: "What is a significant barrier to achieving quality education, especially for girls in developing countries?",
      answers: {
        a: "Lack of qualified teachers",
        b: "Shortage of school supplies",
        c: "Gender-based discrimination",
        d: "Long distances to schools"
      },
      correctAnswer: "c"
    },
    {
      question: "Lifelong learning is an important aspect of SDG 4. What does it refer to?",
      answers: {
        a: "Attending school for a set number of years",
        b: "Completing a university degree",
        c: "Only retraining for a new job",
        d: "Continuous learning opportunities throughout life"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is an example of promoting inclusive education?",
      answers: {
        a: "Building schools in major cities",
        b: "Offering advanced placement courses",
        c: "Providing support programs for students with disabilities",
        d: "Encouraging competition among students"
      },
      correctAnswer: "c"
    },
    {
      question: "SDG 4 emphasizes the importance of quality education. What does this include?",
      answers: {
        a: "Developing critical thinking and problem-solving skills",
        b: "Standardized testing only",
        c: "Large class sizes for efficiency",
        d: "Focusing solely on memorization"
      },
      correctAnswer: "a"
    },
    {
      question: "The completion rate for primary education globally is currently at what percentage (approximately)?",
      answers: {
        a: "50%",
        b: "86%",
        c: "95%",
        d: "We don't have data on this"
      },
      correctAnswer: "b"
    },
    {
      question: "Why is SDG 4 considered crucial for achieving other Sustainable Development Goals?",
      answers: {
        a: "An educated population can contribute to solving other global challenges",
        b: "It reduces traffic congestion",
        c: "It provides free meals to students",
        d: "More schools create more jobs"
      },
      correctAnswer: "a"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 4?",
      answers: {
        a: "Donate money to a specific school",
        b: "Ignore educational issues",
        c: "Advocate for educational opportunities for all",
        d: "All of the above"
      },
      correctAnswer: "d"
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
