(function() {
  const myQuestions = [
    {
      question: "What is the main objective of SDG 2?",
      answers: {
        a: "To reduce food waste globally",
        b: "To eradicate all forms of hunger and malnutrition by 2030",
        c: "To increase agricultural production by 50%",
        d: "To promote sustainable fishing practices"
      },
      correctAnswer: "b" 
    },
    {
      question: "According to the UN, approximately how many people were facing chronic hunger in 2022?",
      answers: {
        a: "Less than 200 million",
        b: "Between 500 million and 700 million",
        c: "Around 735 million",
        d: "Over 1 billion"
      },
      correctAnswer: "c" 
    },
    {
      question: "Which of the following is NOT a target within SDG 2?",
      answers: {
        a: "Reduce food loss along production and supply chains", // This is already a target
        b: "Achieve the internationally agreed targets on stunting and wasting in children under 5",
        c: "Double the agricultural productivity and incomes of small-scale food producers",
        d: "Ensure access by all people to safe, nutritious and sufficient food all year round" 
      },
      correctAnswer: "a" 
    },
    {
      question: "What is a major challenge to achieving food security, especially in developing countries?",
      answers: {
        a: "Lack of arable land",
        b: "Climate change and extreme weather events",
        c: "Food waste in developed nations",
        d: "All of the above"
      },
      correctAnswer: "d" 
    },
    {
      question: "How can sustainable agricultural practices contribute to SDG 2?",
      answers: {
        a: "By conserving water resources and reducing soil erosion",
        b: "By promoting biodiversity and reducing reliance on chemical fertilizers",
        c: "By increasing crop yields and improving food production efficiency",
        d: "All of the above"
      },
      correctAnswer: "d" 
    },
    {
      question: "What is the term for a situation where people lack consistent access to enough affordable, nutritious food?",
      answers: {
        a: "Food insecurity",
        b: "Malnutrition",
        c: "Stunting",
        d: "Wasting"
      },
      correctAnswer: "a" 
    },
    {
      question: "Which international organization plays a leading role in the fight against hunger?",
      answers: {
        a: "The World Health Organization (WHO)",
        b: "The Food and Agriculture Organization (FAO)",
        c: "The United Nations Children's Fund (UNICEF)",
        d: "The World Trade Organization (WTO)"
      },
      correctAnswer: "b" 
    },
    {
      question: "How can individuals contribute to achieving Zero Hunger?",
      answers: {
        a: "Reducing their own food waste",
        b: "Supporting local farmers markets and sustainable food producers",
        c: "Choosing healthy and nutritious foods",
        d: "All of the above"
      },
      correctAnswer: "d" 
    },
    {
      question: "What is the connection between SDG 2 and SDG 12: Responsible Consumption and Production?",
      answers: {
        a: "Reducing food waste is crucial for both achieving food security and sustainable resource management.",
        b: "They both aim to promote sustainable agricultural practices.",
        c: "Both goals focus on eradicating poverty.",
        d: "SDG 12 is primarily concerned with industrial production."
      },
      correctAnswer: "a" 
    },
    {
      question: "Achieving SDG 2 requires collaboration between:",
      answers: {
        a: "Governments and international organizations",
        b: "Farmers, food producers, and consumers",
        c: "The scientific community and research institutions",
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
