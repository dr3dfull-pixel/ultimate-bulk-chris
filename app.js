let weeklyWeights = JSON.parse(localStorage.getItem("weeklyWeights")) || [];

function logWeight() {
  const input = document.getElementById("weightInput");
  const weight = parseFloat(input.value);

  if (!weight) return;

  weeklyWeights.push(weight);
  localStorage.setItem("weeklyWeights", JSON.stringify(weeklyWeights));

  input.value = "";
  renderWeights();
  updateCoach();
}

function renderWeights() {
  const list = document.getElementById("weightList");
  list.innerHTML = "";

  weeklyWeights.forEach((w, index) => {
    const li = document.createElement("li");
    li.textContent = `Week ${index + 1}: ${w} lbs`;
    list.appendChild(li);
  });
}

function updateCoach() {
  const coach = document.getElementById("coachMessage");

  if (weeklyWeights.length < 2) {
    coach.textContent = "Log 2 weeks for feedback.";
    return;
  }

  const last = weeklyWeights[weeklyWeights.length - 1];
  const prev = weeklyWeights[weeklyWeights.length - 2];
  const diff = last - prev;

  if (diff < 0.5) {
    coach.textContent = "Increase calories by 250 per day.";
  } else if (diff > 1.5) {
    coach.textContent = "Gaining fast. Reduce calories slightly.";
  } else {
    coach.textContent = "Perfect lean bulk pace. Stay locked in.";
  }
}

renderWeights();
updateCoach();
