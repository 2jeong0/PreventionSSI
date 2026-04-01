const answers = [
  { x: 120, y: 80, found: false },
  { x: 200, y: 150, found: false },
  { x: 50, y: 200, found: false }
];

let score = 0;

const img = document.getElementById("img2");

img.addEventListener("click", function(e) {
  const rect = img.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  answers.forEach(ans => {
    if (!ans.found &&
        Math.abs(clickX - ans.x) < 20 &&
        Math.abs(clickY - ans.y) < 20) {

      ans.found = true;
      score++;

      drawCircle(ans.x, ans.y);
      document.getElementById("result").innerText =
        `찾은 개수: ${score}`;

      if (score === answers.length) {
        alert("🎉 다 찾았습니다!");
      }
    }
  });
});

function drawCircle(x, y) {
  const circle = document.createElement("div");
  circle.className = "marker";
  circle.style.left = (x - 15) + "px";
  circle.style.top = (y - 15) + "px";

  document.querySelector(".image-box:nth-child(2)").appendChild(circle);
}
