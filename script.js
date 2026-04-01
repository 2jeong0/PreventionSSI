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
  document.getElementById("img1").src = stage.img;
  document.getElementById("img2").src = stage.img;

  document.getElementById("result").innerText = "";
}

document.querySelectorAll(".image-box").forEach((box, index) => {
  box.addEventListener("click", function (e) {
    const rect = box.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const answer = stages[currentStage].answer;

   if (Math.abs(x - answer.x) < 0.05 && Math.abs(y - answer.y) < 0.05) {
      document.getElementById("result").innerText = "정답입니다!";

      const marker = document.getElementById("marker" + (index + 1));
      marker.style.left = (answer.x * rect.width - 15) + "px";
      marker.style.top = (answer.y * rect.height - 15) + "px";
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
