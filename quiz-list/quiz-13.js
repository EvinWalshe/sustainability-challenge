(function() {
  const myQuestions = [
    {
        question: "What is the main focus of SDG 13 (Climate Action)?",
        answers: {
            a: "To prioritize economic development over environmental concerns",
            b: "To take urgent action to combat climate change and its impacts",
            c: "To focus solely on adapting to the impacts of climate change, not mitigating them",
            d: "To deny the existence of human-caused climate change"
        },
        correctAnswer: "b"
    },
    {
        question: "What are the most significant consequences of climate change?",
        answers: {
            a: "Milder winters and longer growing seasons",
            b: "Climate change will have no significant impact",
            c: "More extreme weather events, rising sea levels, and ocean acidification",
            d: "It's too early to say what the consequences will be"
        },
        correctAnswer: "c"
    },
    {
        question: "What are greenhouse gases (GHGs) and how do they contribute to climate change?",
        answers: {
            a: "GHGs trap heat in the atmosphere, causing global warming",
            b: "GHGs are not harmful to the environment",
            c: "The effects of GHGs are negligible",
            d: "We don't fully understand how GHGs work"
        },
        correctAnswer: "a"
    },
    {
        question: "How can transitioning to renewable energy sources contribute to achieving SDG 13?",
        answers: {
            a: "Renewable energy sources are unreliable and inefficient",
            b: "It will have no impact on climate change",
            c: "Renewable energy is too expensive",
            d: "Reducing dependence on fossil fuels can significantly reduce greenhouse gas emissions"
        },
        correctAnswer: "d"
    },
    {
        question: "What role do forests play in mitigating climate change?",
        answers: {
            a: "Forests absorb carbon dioxide from the atmosphere",
            b: "Forests release harmful greenhouse gases",
            c: "Forests have little to no impact on climate change",
            d: "Deforestation is beneficial for the environment"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you, as an individual, contribute to mitigating climate change?",
        answers: {
            a: "Drive long distances every day and avoid carpooling",
            b: "Waste electricity and leave appliances on standby",
            c: "Reduce your carbon footprint by using energy-efficient appliances, consuming less meat, and walking or cycling for short trips",
            d: "Individual actions have no impact on climate change"
        },
        correctAnswer: "c"
    },
    {
        question: "Global temperatures have already hit ___°C, rising due to increasing global greenhouse gas emissions?",
        answers: {
            a: "0.9",
            b: "1.1",
            c: "1.2",
            d: "1.5"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the Paris Agreement, and how is it relevant to SDG 13?",
        answers: {
            a: "It's an agreement between car manufacturers to improve fuel efficiency",
            b: "It's an international treaty on reducing plastic pollution",
            c: "The Paris Agreement is not relevant to climate action",
            d: "It's a landmark agreement where countries set goals to reduce greenhouse gas emissions"
        },
        correctAnswer: "d"
    },
    {
        question: "What are some of the challenges faced in achieving SDG 13?",
        answers: {
            a: "Lack of public awareness about climate change",
            b: "Difficulty transitioning to renewable energy sources in some regions",
            c: "Limited international cooperation on climate action",
            d: "All of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "Why is international cooperation crucial for achieving SDG 13?",
        answers: {
            a: "Individual countries can solve climate change on their own",
            b: "Developed countries have no responsibility to help developing countries",
            c: "Climate change is a global problem that requires a coordinated international response",
            d: "International cooperation hinders progress on climate action"
        },
        correctAnswer: "c"
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
