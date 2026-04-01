const stages = [
  {
    title: "1단계",
    img: "img2.jpg",
    answer: { x: 0.5, y: 0.5 }
  },
  {
    title: "2단계",
    img: "img3.jpg",
    answer: { x: 0.5, y: 0.5 }
  },
  {
    title: "3단계",
    img: "img4.jpg",
    answer: { x: 0.5, y: 0.5 }
  },
  {
    title: "4단계",
    img: "img5.jpg",
    answer: { x: 0.5, y: 0.5 }
  }
];

let currentStage = 0;

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadStage();
}

function loadStage() {
  const stage = stages[currentStage];

  document.getElementById("stage-title").innerText = stage.title;
  document.getElementById("game-img").src = stage.img;
  document.getElementById("result").innerText = "";

  // 👉 마커 초기화 (핵심🔥)
  document.getElementById("marker").style.display = "none";
}

document.getElementById("game-img").addEventListener("click", function (e) {
  const rect = this.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const answer = stages[currentStage].answer;

  if (Math.abs(x - answer.x) < 0.05 && Math.abs(y - answer.y) < 0.05) {
    document.getElementById("result").innerText = "정답입니다!";

    const marker = document.getElementById("marker");

    marker.style.left = (answer.x * rect.width - 20) + "px";
    marker.style.top = (answer.y * rect.height - 20) + "px";
    marker.style.display = "block";

    setTimeout(() => {
      currentStage++;
      if (currentStage < stages.length) {
        loadStage();
      } else {
        showEndMessage();
      }

  } else {
    document.getElementById("result").innerText = "다시 시도!";
  }
});

// 뒤로가기 앞으로가기
function nextStage() {
  currentStage++;
  if (currentStage >= stages.length) {
    showEndMessage();
  } else {
    loadStage();
  }
}

function prevStage() {
  if (currentStage > 0) {
    currentStage--;
    loadStage();
  }
}

// 마지막화면 메시지
function showEndMessage() {
  document.getElementById("stage-title").innerText = "완료!";
  document.getElementById("game-img").style.display = "none";

  document.getElementById("result").innerText =
    "휴게실에서 성함과 번호를 알려주시고, 선물을 받아가세요 ^^";
}

// 저장
const SCRIPT_URL = "AKfycbwCRnd0UsR6M688gi42j-1VGuZLkxMWOzQqL2k8S5hW-4_E1MrbaVy0YkkhoAu44f2e";
