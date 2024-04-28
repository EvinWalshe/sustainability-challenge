(function() {
  const myQuestions = [
    {
        question: "What is the main focus of SDG 17 (Partnerships for the Goals)?",
        answers: {
            a: "To focus solely on national development efforts without international cooperation",
            b: "To prioritize economic growth over social and environmental goals",
            c: "To strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
            d: "To reduce the role of civil society organizations in achieving sustainable development"
        },
        correctAnswer: "c"
    },
    {
        question: "Why are partnerships important for achieving the SDGs?",
        answers: {
            a: "Partnerships are unnecessary; countries can achieve the SDGs alone.",
            b: "Collaboration between governments, businesses, and civil society can mobilize resources and expertise",
            c: "Partnerships create unnecessary bureaucracy and slow down progress.",
            d: "Only wealthy countries have a responsibility to contribute to the SDGs."
        },
        correctAnswer: "b"
    },
    {
        question: "What are some examples of partnerships for sustainable development?",
        answers: {
            a: "Collaborations between businesses and NGOs to promote renewable energy",
            b: "Partnerships between governments to develop nuclear weapons",
            c: "Alliances between countries to exploit natural resources for short-term gain",
            d: "Partnerships between governments and corporations to weaken environmental regulations"
        },
        correctAnswer: "a"
    },
    {
        question: "How can technological innovation contribute to achieving the SDGs?",
        answers: {
            a: "Technological advancements always come at the expense of the environment",
            b: "Only developed countries have the capacity to develop beneficial technologies",
            c: "Technology makes traditional forms of knowledge and expertise obsolete",
            d: "Innovation can lead to new solutions for clean energy, sustainable agriculture, and improved healthcare"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the role of civil society organizations (CSOs) in achieving the SDGs?",
        answers: {
            a: "To hold governments accountable, raise awareness, and mobilize communities",
            b: "To obstruct government efforts and hinder progress",
            c: "To prioritize the interests of corporations over the well-being of people and the planet",
            d: "CSOs have no role to play in achieving sustainable development"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you, as an individual, contribute to partnerships for the SDGs?",
        answers: {
            a: "Remain uninformed and avoid engaging in discussions about sustainability",
            b: "Support organizations working towards the SDGs and advocate for change",
            c: "Prioritize personal gain over the collective good",
            d: "Discourage collaboration and cooperation"
        },
        correctAnswer: "b"
    },
    {
        question: "SDG 17 is interconnected with all the other SDGs. How does a partnership between a government and a private company promoting sustainable agriculture relate to SDG 2 (Zero Hunger)?",
        answers: {
            a: "They are not connected",
            b: "Private companies working with governments always undermine food security",
            c: "Sustainable agriculture can help ensure food security and end hunger",
            d: "Only governments can solve the problem of hunger"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the importance of multi-stakeholder partnerships for the SDGs?",
        answers: {
            a: "Multi-stakeholder partnerships exclude important voices and perspectives",
            b: "Multi-stakeholder partnerships are too complex and time-consuming to be effective",
            c: "Collaboration between different sectors like government, business, and civil society can lead to more comprehensive solutions",
            d: "Only partnerships between governments are effective for achieving the SDGs"
        },
        correctAnswer: "c"
    },
    {
        question: "What are some of the challenges faced in achieving SDG 17?",
        answers: {
            a: "Lack of awareness about the importance of partnerships",
            b: "Difficulty aligning the interests of different stakeholders",
            c: "Limited financial resources for development projects",
            d: "All of the above are challenges"
        },
        correctAnswer: "d"
    },
    {
        question: "Why is global cooperation crucial for achieving the SDGs?",
        answers: {
            a: "Global challenges like climate change and pandemics require a coordinated international response",
            b: "Individual countries can achieve the goals in isolation",
            c: "Global cooperation benefits wealthy countries at the expense of developing ones",
            d: "International cooperation hinders progress on the SDGs"
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
