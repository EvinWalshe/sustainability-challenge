(function () {
  const myQuestions = [
    {
      question: "What does SDG 3 aim to achieve?",
      answers: {
        a: "To provide universal access to primary education",
        b: "To ensure healthy lives and promote well-being for all at all ages",
        c: "To eradicate extreme poverty in all its forms",
        d: "To combat climate change and its impacts",
      },
      correctAnswer: "b",
    },
    {
      question: "Which of the following is NOT a target within SDG 3?",
      answers: {
        a: "Reduce the global maternal mortality ratio to less than 70 per 100,000 live births",
        b: "End preventable deaths of newborns and children under 5",
        c: "Achieve universal health coverage, including financial risk protection",
        d: "Promote mental health and well-being",
      },
      correctAnswer: "d",
    },
    {
      question: "What is NOT an indicator of healthy diet?",
      answers: {
        a: "Eating at least five portions of fruit and vegetables per day",
        b: "Replacing both saturated fats and trans-fats with unsaturated fats",
        c: "Excluding iodized salt",
      },
      correctAnswer: "c",
    },
    {
      question:
        "How can access to education, particularly for girls, contribute to SDG 3?",
      answers: {
        a: "Educated girls are more likely to make informed decisions about their health and well-being.",
        b: "Educated girls are more likely to have healthier children.",
        c: "Both A and B",
        d: "Neither A nor B",
      },
      correctAnswer: "c",
    },
    {
      question:
        "What is the term for a global strategy to combat HIV/AIDS, tuberculosis, malaria, and other neglected tropical diseases?",
      answers: {
        a: "The Millennium Development Goals (MDGs) (outdated)",
        b: "The Sustainable Development Goals (SDGs)",
        c: "The Triple Burden of Disease",
        d: "The Global Fund to Fight AIDS, Tuberculosis and Malaria",
      },
      correctAnswer: "d",
    },
    {
      question:
        "Which organization leads global efforts to improve health worldwide?",
      answers: {
        a: "The World Health Organization (WHO)",
        b: "The United Nations Children's Fund (UNICEF)",
        c: "The World Bank",
        d: "The International Labour Organization (ILO)",
      },
      correctAnswer: "a",
    },
    {
      question:
        "How can access to healthy and affordable food contribute to achieving SDG 3?",
      answers: {
        a: "It helps to reduce malnutrition, a major risk factor for many diseases.",
        b: "It improves overall well-being and mental health by providing essential nutrients for brain function.",
        c: "Access to food is not directly related to health outcomes.",
        d: "While food security is important, it's not the sole factor impacting SDG 3.",
      },
      correctAnswer: "a",
    },
    {
      question:
        "What is a social determinant of health that SDG 3 aims to address?",
      answers: {
        a: "Access to quality education, particularly for girls, empowers them to make informed health choices.",
        b: "Safe and secure housing reduces exposure to environmental hazards and improves overall well-being.",
        c: "Social stigma around mental health issues can prevent people from seeking help, hindering progress on SDG 3.",
        d: "Limited access to clean water and sanitation increases the risk of infectious diseases.",
      },
      correctAnswer: "a",
    },
    {
      question: "Achieving SDG 3 requires a focus on:",
      answers: {
        a: "Preventive healthcare rather than just treatment of illnesses.",
        b: "Addressing the social determinants of health, like poverty and education.",
        c: "Both A and B",
        d: "Neither A nor B",
      },
      correctAnswer: "c",
    },
    {
      question:
        "SDG 3 is a long-term vision. What year is the target date for achieving its goals?",
      answers: {
        a: "2025",
        b: "2030",
        c: "2040",
        d: "There is no specific target date",
      },
      correctAnswer: "b",
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
