(function() {
  const myQuestions = [
    {
        question: "What is the main focus of SDG 14 (Life Below Water)?",
        answers: {
            a: "To prioritize economic development of coastal areas without considering environmental impact",
            b: "To manage and conserve marine and coastal ecosystems sustainably",
            c: "To promote activities that harm marine life",
            d: "To conserve and sustainably use the oceans, seas and marine resources for sustainable development"
        },
        correctAnswer: "d"
    },
    {
        question: "Why are healthy oceans essential for the planet?",
        answers: {
            a: "Oceans have no significant impact on the environment",
            b: "Oceans regulate the climate, provide food and resources, and support biodiversity",
            c: "Oceans are only important for marine life",
            d: "Oceans are a source of pollution"
        },
        correctAnswer: "b"
    },
    {
        question: "What are some of the major threats to marine ecosystems?",
        answers: {
            a: "Sustainable fishing practices and responsible waste disposal",
            b: "Technological advancements for ocean exploration",
            c: "Overfishing, pollution, and habitat destruction",
            d: "Marine life is naturally resilient to human activities"
        },
        correctAnswer: "c"
    },
    {
        question: "How does plastic pollution impact marine life?",
        answers: {
            a: "Plastic has no negative effects on marine organisms",
            b: "Plastic pollution can entangle and kill marine animals",
            c: "Microplastics can enter the food chain and harm marine life and potentially humans",
            d: "Plastic pollution benefits coral reefs"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the importance of marine protected areas (MPAs) in achieving SDG 14?",
        answers: {
            a: "MPAs can help to conserve marine biodiversity and allow fish populations to recover",
            b: "MPAs allow unlimited fishing and resource extraction",
            c: "MPAs restrict access to all marine resources, harming fishing communities",
            d: "MPAs have no impact on the health of marine ecosystems"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you, as an individual, contribute to protecting life below water?",
        answers: {
            a: "Dispose of all waste in storm drains",
            b: "Reduce your use of single-use plastics, choose seafood from sustainable sources, and be mindful of what you flush down the drain",
            c: "Support unsustainable fishing practices",
            d: "Individually, you cannot make a difference for the oceans"
        },
        correctAnswer: "b"
    },
    {
        question: "SDG 14 is interconnected with other SDGs. How does protecting life below water relate to SDG 2 (Zero Hunger)?",
        answers: {
            a: "Overfishing can disrupt food chains and threaten food security",
            b: "Healthy oceans are a vital source of food for humans",
            c: "They are not connected",
            d: "Protecting marine life will reduce the availability of seafood"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the estimated percentage of the global population that relies on seafood as a primary source of protein?",
        answers: {
            a: "10%",
            b: "20%",
            c: "30%",
            d: "50%"
        },
        correctAnswer: "d"
    },
    {
        question: "What are some of the challenges faced in achieving SDG 14?",
        answers: {
            a: "Lack of public awareness about ocean issues",
            b: "Illegal, unreported, and unregulated (IUU) fishing practices",
            c: "Climate change impacting ocean health",
            d: "All of the above are challenges"
        },
        correctAnswer: "d"
    },
    {
        question: "Why is international cooperation crucial for achieving SDG 14?",
        answers: {
            a: "Individual countries can solve ocean problems on their own",
            b: "Ocean pollution respects national borders",
            c: "The ocean is a global resource, and challenges like overfishing and pollution require a coordinated international response",
            d: "International cooperation hinders progress on protecting marine life"
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
