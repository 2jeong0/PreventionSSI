// 🔥 GAS URL (반드시 전체 URL!)
const SCRIPT_URL = "https://script.google.com/macros/s/여기에전체URL/exec";

// 스테이지
const stages = [
  { title: "1단계", img: "img2.jpg", answer: { x: 0.5, y: 0.5 } },
  { title: "2단계", img: "img3.jpg", answer: { x: 0.5, y: 0.5 } },
  { title: "3단계", img: "img4.jpg", answer: { x: 0.5, y: 0.5 } },
  { title: "4단계", img: "img5.jpg", answer: { x: 0.5, y: 0.5 } }
];

let currentStage = 0;

// 시작
function startGame() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  if (!name || !id) {
    alert("이름과 번호를 입력해주세요!");
    return;
  }

  // 👉 저장 (에러 나도 게임은 진행되게)
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ name, id })
  }).catch(() => {});

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  loadStage();
}

// 스테이지 로드
function loadStage() {
  const stage = stages[currentStage];

  document.getElementById("stage-title").innerText = stage.title;
  document.getElementById("game-img").src = stage.img;
  document.getElementById("result").innerText = "";
  document.getElementById("marker").style.display = "none";
  document.getElementById("game-img").style.display = "block";
}

// 이미지 클릭
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
    }, 1000);  // 🔥 빠진 괄호 수정됨

  } else {
    document.getElementById("result").innerText = "다시 시도!";
  }
});

// 이전 / 다음
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

// 종료 화면
function showEndMessage() {
  document.getElementById("stage-title").innerText = "완료!";
  document.getElementById("game-img").style.display = "none";
  document.getElementById("result").innerText =
    "휴게실에서 성함과 번호를 알려주시고, 선물을 받아가세요 ^^";
}
