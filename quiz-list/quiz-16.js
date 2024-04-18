(function () {
  const myQuestions = [
    {
      question: "What is the main focus of SDG 16 (Peace, Justice and Strong Institutions)?",
      answers: {
        a: "To promote peaceful and inclusive societies for sustainable development and provide access to justice for all",
        b: "To focus solely on national security without international cooperation",
        c: "To prioritize economic development over promoting peaceful societies",
        d: "To undermine legal systems and institutions"
      },
      correctAnswer: "a"
    },
    {
      question: "Why is peace essential for achieving sustainable development?",
      answers: {
        a: "Conflicts divert resources away from development efforts and can damage infrastructure",
        b: "Peace has no bearing on sustainable development",
        c: "Development automatically leads to peace",
        d: "Peace negotiations are a waste of time"
      },
      correctAnswer: "a"
    },
    {
      question: "What are some of the key aspects of access to justice?",
      answers: {
        a: "Fair trials, equal treatment under the law, and affordable legal services",
        b: "Limited legal options and lack of enforcement",
        c: "A justice system that prioritizes punishment over rehabilitation",
        d: "Lack of transparency and accountability in legal proceedings"
      },
      correctAnswer: "a"
    },
    {
      question: "What is the role of strong institutions in achieving SDG 16?",
      answers: {
        a: "Effective institutions promote peace, justice, human rights, and sustainable development",
        b: "Institutions should be unaccountable to the public",
        c: "Weak institutions are better for economic growth",
        d: "Strong institutions suppress individual freedoms"
      },
      correctAnswer: "a"
    },
    {
      question: "How can corruption hinder progress on SDG 16?",
      answers: {
        a: "Corruption has no impact on peace, justice, and development",
        b: "Corruption undermines trust in institutions and the rule of law",
        c: "Corruption benefits society by stimulating the economy",
        d: "Corruption is a necessary part of politics"
      },
      correctAnswer: "b"
    },
    {
      question: "How can you, as an individual, contribute to promoting peace and justice?",
      answers: {
        a: "Tolerate discrimination and violence",
        b: "Advocate for peace and human rights",
        c: "Spread misinformation and hate speech",
        d: "Support organizations working for peace and justice, and treat others with respect and understanding"
      },
      correctAnswer: "d"
    },
    {
      question: "SDG 16 is interconnected with other SDGs. How does promoting peace relate to SDG 8 (Decent Work and Economic Growth)?",
      answers: {
        a: "Economic inequality can contribute to social unrest",
        b: "They are not connected",
        c: "Peace automatically leads to economic prosperity",
        d: "War is good for economic growth"
      },
      correctAnswer: "a"
    },
    {
      question: "What percentage of the world's population is estimated to live in conflict-affected areas?",
      answers: {
        a: "5%",
        b: "10%",
        c: "25%",
        d: "50%"
      },
      correctAnswer: "c"
    },
    {
      question: "What are some of the challenges faced in achieving SDG 16?",
      answers: {
        a: "Lack of public awareness about human rights issues",
        b: "Inequality and discrimination",
        c: "Weak rule of law and corruption",
        d: "All of the above are challenges"
      },
      correctAnswer: "d"
    },
    {
      question: "Why is international cooperation crucial for achieving SDG 16?",
      answers: {
        a: "Countries can solve problems like war and human rights abuses on their own",
        b: "International conflicts are a local issue",
        c: "International cooperation hinders peacebuilding efforts",
        d: "Global problems like terrorism, organized crime, and human trafficking require a coordinated international response"
      },
      correctAnswer: "d"
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
