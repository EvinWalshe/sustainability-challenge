(function() {
  const myQuestions = [
    {
        question: "What is the main focus of SDG 15 (Life on Land)?",
        answers: {
            a: "To focus solely on protecting marine ecosystems, neglecting land-based habitats",
            b: "To prioritize economic development over environmental conservation",
            c: "To protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
            d: "To promote activities that harm land animals and plants"
        },
        correctAnswer: "c"
    },
    {
        question: "Why is protecting biodiversity important for the health of the planet?",
        answers: {
            a: "Biodiversity has no significant impact on the environment",
            b: "A healthy planet relies on the variety of life on land, providing us with food, clean water, and regulating the climate",
            c: "Biodiversity is a threat to human health",
            d: "We can replace the functions of nature with technology"
        },
        correctAnswer: "b"
    },
    {
        question: "What are some of the major threats to land-based ecosystems?",
        answers: {
            a: "Sustainable land management practices and responsible waste disposal",
            b: "Land ecosystems are naturally resilient to human activities",
            c: "Technological advancements for ecological monitoring",
            d: "Habitat loss, deforestation, pollution, and climate change"
        },
        correctAnswer: "d"
    },
    {
        question: "How does deforestation contribute to climate change?",
        answers: {
            a: "Deforestation has no impact on climate change",
            b: "Deforestation purifies the air",
            c: "Deforestation helps to cool the planet",
            d: "Forests absorb carbon dioxide, a greenhouse gas. Deforestation releases this CO2 back into the atmosphere"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the concept of \"sustainable forest management\" within the context of SDG 15?",
        answers: {
            a: "Managing forests in a way that meets the needs of the present without compromising the ability of future generations to meet their own needs",
            b: "Planting trees but not caring for them afterwards",
            c: "Cutting down as many trees as possible to maximize profits",
            d: "Sustainable forest management is not a real concept"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you, as an individual, contribute to protecting life on land?",
        answers: {
            a: "Use excessive amounts of paper products and avoid recycling",
            b: "Support unsustainable logging practices",
            c: "Reduce your consumption of paper and wood products, plant trees, and support organizations working to conserve land",
            d: "Individually, you cannot make a difference for land ecosystems"
        },
        correctAnswer: "c"
    },
    {
        question: "SDG 15 is interconnected with other SDGs. How does protecting life on land relate to SDG 3 (Good Health and Well-being)?",
        answers: {
            a: "They are not connected",
            b: "Healthy ecosystems provide clean air and water, essential for human health",
            c: "Many medicinal plants come from terrestrial ecosystems",
            d: "Protecting life on land has negative consequences for public health"
        },
        correctAnswer: "b"
    },
    {
        question: "What percentage of the world's land surface is estimated to be covered by forests?",
        answers: {
            a: "10%",
            b: "20%",
            c: "30%",
            d: "30-40%"
        },
        correctAnswer: "d"
    },
    {
        question: "What are some of the challenges faced in achieving SDG 15?",
        answers: {
            a: "Lack of public awareness about the importance of land ecosystems",
            b: "Balancing economic development with environmental protection",
            c: "Climate change making it harder to restore degraded land",
            d: "All of the above are challenges"
        },
        correctAnswer: "d"
    },
    {
        question: "Why is international cooperation crucial for achieving SDG 15?",
        answers: {
            a: "Individual countries can solve problems like deforestation on their own",
            b: "Land degradation and habitat loss respect national borders",
            c: "Many environmental issues, like migratory species and desertification, transcend national boundaries and require a coordinated international response",
            d: "International cooperation hinders progress on protecting life on land"
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
