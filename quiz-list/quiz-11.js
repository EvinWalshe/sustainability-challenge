(function() {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 11 (Sustainable Cities and Communities)?",
      answers: {
        a: "To prioritize economic growth in urban areas, even if it harms the environment",
        b: "To focus solely on improving living conditions in high-income countries",
        c: "To make cities and human settlements inclusive, safe, resilient and sustainable",
        d: "To encourage people to move to rural areas"
      },
      correctAnswer: "c"
    },
    {
      question: "Why is promoting sustainable urban development important?",
      answers: {
        a: "Cities are major contributors to climate change and environmental pollution",
        b: "Most of the world's population already lives in rural areas",
        c: "Cities use less resources than rural areas",
        d: "Sustainable cities have no economic benefits"
      },
      correctAnswer: "a"
    },
    {
      question: "What does 'inclusive' cities mean within the context of SDG 11?",
      answers: {
        a: "Cities with a high concentration of businesses",
        b: "Cities that prioritize infrastructure for cars",
        c: "Cities with limited public transportation options",
        d: "Cities that provide equal opportunities for all residents, regardless of background"
      },
      correctAnswer: "d"
    },
    {
      question: "How can building safe cities contribute to achieving SDG 11?",
      answers: {
        a: "By focusing on increased law enforcement presence only",
        b: "By reducing the risk of natural disasters through improved infrastructure",
        c: "By promoting community safety programs and social inclusion",
        d: "Safe cities require more gated communities"
      },
      correctAnswer: "b"
    },
    {
      question: "SDG 11 emphasizes the importance of green spaces in cities. Why are these spaces important?",
      answers: {
        a: "They take up valuable land that could be used for buildings",
        b: "They increase traffic congestion",
        c: "They improve air quality and provide recreational opportunities",
        d: "Green spaces only benefit wealthy residents"
      },
      correctAnswer: "c"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 11 in your community?",
      answers: {
        a: "Only use private transportation and avoid public options",
        b: "Support initiatives that promote sustainable transportation and waste reduction",
        c: "Dispose of litter carelessly",
        d: "Discourage green building practices"
      },
      correctAnswer: "b"
    },
    {
      question: "SDG 11 is interconnected with other SDGs. How does creating sustainable cities relate to SDG 13 (Climate Action)?",
      answers: {
        a: "Sustainable cities can help reduce greenhouse gas emissions",
        b: "Sustainable cities have no impact on climate change",
        c: "Cities can be hubs for innovation in clean energy technologies",
        d: "Sustainable cities use more resources"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the estimated percentage of the global population living in urban areas by 2050 (according to UN estimates)?",
      answers: {
        a: "20%",
        b: "40%",
        c: "60%",
        d: "70%"
      },
      correctAnswer: "d"
    },
    {
      question: "What challenges does urban sprawl pose for achieving SDG 11?",
      answers: {
        a: "It encourages more people to live in walkable communities",
        b: "It promotes efficient use of land and resources",
        c: "It increases traffic congestion and strains infrastructure",
        d: "Urban sprawl benefits public health"
      },
      correctAnswer: "c"
    },
    {
      question: "SDG 11 highlights the importance of cultural heritage preservation. Why is this important for sustainable cities?",
      answers: {
        a: "It takes away space for modern development",
        b: "Preserving cultural heritage creates a sense of place and community identity",
        c: "It promotes a monoculture in cities",
        d: "It has no economic value"
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
