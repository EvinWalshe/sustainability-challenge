// Initialize total score
let totalScore = 0;

// Update total score when an option is selected for question 1
document.querySelectorAll('input[name="q1"]').forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value !== "0") {
      totalScore += parseFloat(this.value) * 52; // Multiply by 52 to calculate yearly emissions
    }
  });
});

// Update total score when an option is selected for question 2
document.querySelectorAll('input[name="q2"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Update total score when an option is selected for question 3
document.querySelectorAll('input[name="q3"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Update total score when an option is selected for question 4
document.querySelectorAll('input[name="q4"]').forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value !== "0") {
      totalScore += parseFloat(this.value) * 52; // Multiply by 52 to calculate yearly emissions
    }
  });
});

// Update total score when an option is selected for question 5
document.querySelectorAll('input[name="q5"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Update total score when an option is selected for question 6
document.querySelectorAll('input[name="q6"]').forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value !== "0.2") {
      totalScore += parseFloat(this.value) * 52; // Multiply by 52 to calculate yearly emissions
    }
  });
});

// Update total score when an option is selected for question 7
document.querySelectorAll('input[name="q7"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Update total score when an option is selected for question 8
document.querySelectorAll('input[name="q8"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Update total score when an option is selected for question 9
document.querySelectorAll('input[name="q9"]').forEach((input) => {
  input.addEventListener("change", function () {
    totalScore += parseFloat(this.value);
  });
});

// Calculate total score and display result
document.getElementById("calculate").addEventListener("click", function () {
  // Calculate total score
  let totalScore = 0;
  document.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
    totalScore += parseFloat(input.value);
  });

  // Display total score
  const resultDiv = document.getElementById("result");
  const scoreParagraph = document.getElementById("score");
  scoreParagraph.textContent = `Total Emissions: ${totalScore.toFixed(
    2
  )} Kilograms per year`;

  // Display additional text before the link
  const additionalText = document.getElementById("additional-text");
  if (!additionalText) {
    const infoLink = document.getElementById("info-link-q1");
    infoLink.insertAdjacentHTML(
      "beforebegin",
      `<p id="additional-text">     
      If your score was lower than 200 kg per year: Well done! Your habits are on the lower end of the spectrum when it comes to carbon emissions.
      <br> <br>
      If your score was around 200-400kg per year: You fall into the average amount of carbon emissions produced annually. There is always room for improvement however!
      <br> <br>
      If your score is over 400kg per year: Your carbon emissions are high for these little habits. You might want to try and lower that score as these habits do have a bigger effect than you might realise.</p>`
    );
  }

  // Display the result section and info link
  resultDiv.style.display = "block";
  document.getElementById("info-link").style.display = "block";
});
