(function() {
  const myQuestions = [
    {
      question: "What is the ultimate goal of SDG 5 (Gender Equality)?",
      answers: {
        a: "Increase the number of women in leadership positions only",
        b: "Eliminate violence against women solely",
        c: "Achieve gender equality and empower all women and girls",
        d: "Focus on closing the pay gap between genders"
      },
      correctAnswer: "c"
    },
    {
      question: "How many targets are there within SDG 5?",
      answers: {
        a: "3",
        b: "9",
        c: "12",
        d: "There are too many to count"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following is NOT a target of SDG 5?",
      answers: {
        a: "End all forms of discrimination against women and girls",
        b: "Ensure women's full and effective participation in decision-making",
        c: "Eliminate all harmful practices, such as child marriage",
        d: "Increase access to technology specifically for women"
      },
      correctAnswer: "d"
    },
    {
      question: "What is a major barrier to achieving gender equality globally?",
      answers: {
        a: "Deeply rooted gender stereotypes and social norms",
        b: "Limited career opportunities for men",
        c: "Lack of access to transportation",
        d: "Climate change"
      },
      correctAnswer: "a"
    },
    {
      question: "SDG 5 emphasizes the importance of empowering girls. Why is this important?",
      answers: {
        a: "Girls are better at memorizing facts",
        b: "Educated girls can contribute more to their communities and economies",
        c: "Boys need less encouragement"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the term for unpaid care work, traditionally performed by women, such as housework and childcare?",
      answers: {
        a: "Domestic duties",
        b: "Women's work",
        c: "Unrecognized work"
      },
      correctAnswer: "c"
    },
    {
      question: "According to UN Women, what percentage of parliamentarians globally are women (as of 2022)?",
      answers: {
        a: "10%",
        b: "25%",
        c: "40%",
        d: "26%"
      },
      correctAnswer: "d"
    },
    {
      question: "What is an example of promoting gender equality in education?",
      answers: {
        a: "Offering equal access to quality education for all genders",
        b: "Providing scholarships for boys from disadvantaged backgrounds",
        c: "Encouraging girls to take STEM classes only ",
        d: "Building separate schools for girls"
      },
      correctAnswer: "a"
    },
    {
      question: "How can you, as an individual, contribute to achieving SDG 5?",
      answers: {
        a: "Only celebrate achievements of successful women",
        b: "Disregard gender stereotypes in your everyday life",
        c: "Donate money to a specific women's charity only",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "SDG 5 is a crucial part of achieving the overall Sustainable Development Goals. Why?",
      answers: {
        a: "Gender equality is interconnected with many other global challenges",
        b: "Gender equality leads to more arguments",
        c: "Men benefit more from achieving SDG 5"
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
