(function() {
  const myQuestions = [
    {
        question: "What is the main focus of SDG 12 (Responsible Consumption and Production)?",
        answers: {
            a: "To ensure sustainable consumption and production patterns",
            b: "To encourage businesses to relocate to countries with lower environmental regulations",
            c: "To prioritize economic growth over environmental sustainability",
            d: "To promote excessive consumerism"
        },
        correctAnswer: "a"
    },
    {
        question: "Why is promoting sustainable consumption and production important?",
        answers: {
            a: "It allows businesses to cut costs without regard to environmental impact",
            b: "It encourages the depletion of natural resources",
            c: "It has no significant impact on the environment",
            d: "It helps to reduce pollution, conserve resources, and mitigate climate change"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the concept of a \"circular economy\" within the context of SDG 12?",
        answers: {
            a: "A focus on minimizing waste and maximizing resource recovery",
            b: "A model that encourages overconsumption and frequent product replacement",
            c: "A system where products are designed to be easily repairable and last longer",
            d: "A circular economy has no environmental benefits"
        },
        correctAnswer: "a"
    },
    {
        question: "How can technological advancements contribute to achieving SDG 12?",
        answers: {
            a: "By developing technologies that increase pollution",
            b: "By developing innovative solutions for recycling, resource efficiency, and clean energy",
            c: "By creating new products without considering their environmental impact",
            d: "Technology has no role to play in sustainable consumption and production"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the role of consumers in achieving SDG 12?",
        answers: {
            a: "To prioritize the lowest price, regardless of environmental or social impact",
            b: "To have limited knowledge about the products they consume",
            c: "To make informed choices about the products they buy and how they dispose of them",
            d: "Consumers have no influence on sustainable production practices"
        },
        correctAnswer: "c"
    },
    {
        question: "How can you, as an individual, contribute to achieving SDG 12?",
        answers: {
            a: "Only purchase the latest trends and discard clothes frequently",
            b: "Waste food and not compost organic materials",
            c: "Reduce your consumption, reuse items whenever possible, and recycle properly",
            d: "Discourage businesses from adopting sustainable practices"
        },
        correctAnswer: "c"
    },
    {
        question: "SDG 12 is interconnected with other SDGs. How does responsible consumption and production relate to SDG 3 (Good Health and Well-being)?",
        answers: {
            a: "They are not connected",
            b: "Sustainable practices can reduce pollution, leading to improved health outcomes",
            c: "Responsible consumption of food can help reduce malnutrition and diet-related diseases",
            d: "SDG 12 has negative impacts on public health"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the estimated global food waste annually (according to UN estimates)?",
        answers: {
            a: "1 billion tons",
            b: "1.3 billion tons",
            c: "2 billion tons",
            d: "We don't have this data"
        },
        correctAnswer: "b"
    },
    {
        question: "What are some challenges faced in achieving SDG 12, especially in developing countries?",
        answers: {
            a: "Lack of access to education on sustainable consumption",
            b: "Limited access to clean technologies and infrastructure for recycling",
            c: "Both A and B are correct",
            d: "Developing countries are already sustainable producers"
        },
        correctAnswer: "c"
    },
    {
        question: "SDG 12 emphasizes the importance of educating consumers about sustainable practices. Why is this important?",
        answers: {
            a: "Consumers don't need to understand the environmental impact of their choices",
            b: "Informed consumers can make choices that benefit the environment and their health",
            c: "Education empowers consumers to hold businesses accountable for their practices",
            d: "Educating consumers is too expensive"
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
