const stages = [
  {
    title: "1단계",
    img: "img2.jpg",
    answer: { x: 50, y: 60 }
  },
  {
    title: "2단계",
    img: "img3.jpg",
    answer: { x: 120, y: 80 }
  },
  {
    title: "3단계",
    img: "img4.jpg",
    answer: { x: 90, y: 150 }
  },
  {
    title: "4단계",
    img: "img5.jpg",
    answer: { x: 200, y: 120 }
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
  document.getElementById("img1").src = stage.img;
  document.getElementById("img2").src = stage.img;

  document.getElementById("result").innerText = "";
}

document.querySelectorAll(".image-box").forEach((box, index) => {
  box.addEventListener("click", function (e) {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const answer = stages[currentStage].answer;

    if (Math.abs(x - answer.x) < 30 && Math.abs(y - answer.y) < 30) {
      document.getElementById("result").innerText = "정답입니다!";

      const marker = document.getElementById("marker" + (index + 1));
      marker.style.left = (answer.x - 15) + "px";
      marker.style.top = (answer.y - 15) + "px";
      marker.style.display = "block";

      setTimeout(() => {
        currentStage++;
        if (currentStage < stages.length) {
          loadStage();
        } else {
          document.getElementById("result").innerText = "완료!";
        }
      }, 1000);

    } else {
      document.getElementById("result").innerText = "다시 시도!";
    }
  });
});
