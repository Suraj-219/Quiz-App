const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    correct: 1
  },
  {
    question: "What year was JavaScript launched?",
    answers: ["1996", "1995", "1994", "None of the above"],
    correct: 1
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: ["<script>", "<style>", "<css>", "<link>"],
    correct: 1
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Netscape", "Mozilla", "Microsoft", "Sun Microsystems"],
    correct: 0
  },
  {
    question: "What does DOM stand for?",
    answers: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Oriented Mode"],
    correct: 0
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: ["color", "bgcolor", "background-color", "background"],
    correct: 2
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
    correct: 3
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "<!-- -->", "#", "**"],
    correct: 0
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: ["font", "class", "style", "styles"],
    correct: 2
  }

];


let currentQuestion = 0;
let score = 0;
let wrongAnswers = [];

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const diagramContainer = document.getElementById('diagram-container');
const diagramCanvas = document.getElementById('result-diagram');
const diagramLabel = document.getElementById('diagram-label');
const wrongList = document.getElementById('wrong-list');

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.classList.add('answer-btn');
    btn.onclick = () => selectAnswer(idx, btn);
    answersEl.appendChild(btn);
  });
  nextBtn.classList.add('hidden');
  resultEl.classList.add('hidden');
  wrongList.classList.add('hidden');
  diagramContainer.style.display = 'none';
}

function selectAnswer(idx, btn) {
  const q = questions[currentQuestion];
  Array.from(answersEl.children).forEach(b => b.disabled = true);
  if (idx === q.correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    answersEl.children[q.correct].classList.add('correct');
    wrongAnswers.push({
      question: q.question,
      yourAnswer: q.answers[idx],
      correctAnswer: q.answers[q.correct]
    });
  }
  nextBtn.classList.remove('hidden');
}


nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  questionEl.textContent = '';
  answersEl.innerHTML = '';
  nextBtn.classList.add('hidden');
  resultEl.textContent = `You scored ${score} out of ${questions.length}!`;
  resultEl.classList.remove('hidden');

  
  diagramContainer.style.display = 'block';
  drawCircleDiagram(score, questions.length - score);
  diagramLabel.textContent = `${score} Correct / ${questions.length - score} Wrong`;

  
  if (wrongAnswers.length > 0) {
    let html = '<h3 style="color:#d63031;">Review Wrong Answers</h3><ul style="text-align:left;">';
    wrongAnswers.forEach(item => {
      html += `<li><strong>Q:</strong> ${item.question}<br><span style='color:#b71c1c;'><strong>Your answer:</strong> ${item.yourAnswer}</span><br><span style='color:#00b894;'><strong>Correct:</strong> ${item.correctAnswer}</span></li><br>`;
    });
    html += '</ul>';
    wrongList.innerHTML = html;
    wrongList.classList.remove('hidden');
  } else {
    wrongList.innerHTML = '';
    wrongList.classList.add('hidden');
  }
}

function drawCircleDiagram(right, wrong) {
  const ctx = diagramCanvas.getContext('2d');
  const total = right + wrong;
  const r = 70;
  const cx = 80, cy = 80;
  ctx.clearRect(0, 0, 160, 160);
  
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#f1f2f6';
  ctx.fill();
  
  const correctAngle = (right / total) * 2 * Math.PI;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, -0.5 * Math.PI, -0.5 * Math.PI + correctAngle, false);
  ctx.closePath();
  ctx.fillStyle = '#06846bff';
  ctx.fill();
  
  if (wrong > 0) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -0.5 * Math.PI + correctAngle, 1.5 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = '#d63031';
    ctx.fill();
  }
 
  ctx.font = 'bold 1.5rem Segoe UI, Arial';
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${right}`, cx, cy);
}

showQuestion();