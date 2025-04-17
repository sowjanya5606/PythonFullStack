const box = document.getElementById("box");
const surpriseDiv = document.getElementById("surprise");
const openCountText = document.getElementById("openCount");

// const surprises = [
//   "💡 A quote: 'Believe in yourself!'",
//   "😂 A joke: Why don't scientists trust atoms? Because they make up everything!",
//   "🧩 Puzzle: What comes once in a minute, twice in a moment, and never in a thousand years?",
//   "📷 Surprise Image:<br><img src='https://picsum.photos/200?random=' + Math.floor(Math.random() * 1000) + '' alt='Random Image' style='margin-top:10px; border-radius:10px;' />",
//   "🎵 Play sound (click to play): <audio controls src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'></audio>",
//   "📝 Task: Write down 3 things you're grateful for today.",
// ];
const surprises = [
  () => "💡 A quote: 'Believe in yourself!'",
  () => "😂 A joke: Why don't scientists trust atoms? Because they make up everything!",
  () => "🧩 Puzzle: What comes once in a minute, twice in a moment, and never in a thousand years?",
  () => "📷 Surprise Image:<br><img src='https://picsum.photos/200?random=" + Math.floor(Math.random() * 1000) + "' alt='Random Image' style='margin-top:10px; border-radius:10px;' />",
  () => "🎵 Play sound:<br><audio controls src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'></audio>",
  () => "📝 Task: Write down 3 things you're grateful for today.",
];

// function getRandomSurprise() {
//   const index = Math.floor(Math.random() * surprises.length);
//   return surprises[index];
// }
function getRandomSurprise() {
  const index = Math.floor(Math.random() * surprises.length);
  return surprises[index](); // call the function
}

function showSurprise() {
  // let count = parseInt(localStorage.getItem("openCount") || "0");
  // count += 1;
  // localStorage.setItem("openCount", count);

  const surprise = getRandomSurprise();
  surpriseDiv.innerHTML = surprise;
  surpriseDiv.style.display = "block";

  // openCountText.textContent = `You've opened the box ${count} time${count > 1 ? 's' : ''}.`;
}

// Show count on page load
window.onload = () => {
  const count = parseInt(localStorage.getItem("openCount") || "0");
  if (count > 0) {
    // openCountText.textContent = `You've opened the box ${count} time${count > 1 ? 's' : ''}.`;
  }
};

// Handle box click
box.onclick = showSurprise;
