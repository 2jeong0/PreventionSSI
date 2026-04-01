// ✅ 문제(스테이지) 설정
const stages = [
  {
    img: "img2.jpg",
    answers: [
      { x: 120, y: 80, found: false },
      { x: 200, y: 150, found: false }
    ]
  },
  {
    img: "img3.jpg",
    answers: [
      { x: 80, y: 120, found: false }
    ]
  },
  {
    img: "img4.jpg",
    answers: [
      { x: 150, y: 200, found: false }
    ]
  },
  {
    img: "img5.jpg",
    answers: [
      { x: 100, y: 100, found: false }
    ]
  }
];

let currentStage = 0;
let score = 0;

// ✅ 게임 시작
function startGame() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  if (name === "" || id === "") {
    alert("이름과 고유번호를 입력하세요!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  loadStage();
}

// ✅ 문제 로드
function loadStage() {
  const stage = stages[currentStage];

  // 이미지 변경
  const gameImg = document.getElementById("game-img");
  gameImg.src = stage.img;

  // 이전 표시 제거
  const box = document.querySelector(".image-box:nth-child(2)");
  box.querySelectorAll(".marker").forEach(el => el.remove());

  // 텍스트 초기화
  document.getElementById("result").innerText = "틀린 곳을 찾아보세요!";
}

// ✅ 클릭 이벤트 (핵심🔥)
document.addEventListener("click", function(e) {
  const gameImg = document.getElementById("game-img");
  if (!gameImg || e.target !== gameImg) return;

  const rect = gameImg.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  const stage = stages[currentStage];

  stage.answers.forEach(ans => {
    if (
      !ans.found &&
      Math.abs(clickX - ans.x) < 30 &&
      Math.abs(clickY - ans.y) < 30
    ) {
      ans.found = true;
      score++;

      drawCircle(ans.x, ans.y);

      document.getElementById("result").innerText = "정답입니다! 🎉";

      // ✅ 해당 문제 다 찾으면 다음으로
      if (stage.answers.every(a => a.found)) {
        setTimeout(() => {
          currentStage++;

          if (currentStage < stages.length) {
            loadStage();
          } else {
            document.getElementById("result").innerText =
              "모든 문제 완료! 👏";
          }
        }, 1000);
      }
    }
  });
});

// ✅ 동그라미 표시
function drawCircle(x, y) {
  const circle = document.createElement("div");
  circle.className = "marker";
  circle.style.left = (x - 15) + "px";
  circle.style.top = (y - 15) + "px";

  document
    .querySelector(".image-box:nth-child(2)")
    .appendChild(circle);
}
