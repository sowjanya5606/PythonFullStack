const greeting = document.getElementById("greeting");
const message = document.getElementById("message");
const hour = new Date().getHours();

if (hour >= 5 && hour < 12) {
  greeting.textContent = "Good Morning, Explorer!";
} else if (hour >= 12 && hour < 18) {
  greeting.textContent = "Good Afternoon, Dreamer!";
} else if (hour >= 18 && hour < 21) {
  greeting.textContent = "Good Evening, Stargazer!";
} else {
  greeting.textContent = "Good Night, Time Traveler!";
}

if (hour >= 20 || hour < 6) {
  const sky = document.getElementById("sky");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    sky.appendChild(star);
  }
}
const memories = document.getElementById("memories");
const items = [
  "🌟 Dream",
  "📷 Snapshot",
  "📖 Quote",
  "🎵 Melody",
  "✉️ Note"
];

items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "memory";
    div.textContent = item;
    if (item === "📷 Snapshot") {
        div.onclick = () => {
            document.getElementById("fileInput").click();
        };
    } else if (item === "📖 Quote") {
        div.onclick = () => {
            const quote = prompt("Write your favorite quote:");
            if (quote) {
                localStorage.setItem("userQuote", quote);
                alert("Quote saved!");
            }
        };
    } else if (item === "🎵 Melody") {
        div.onclick = () => {
            document.getElementById("musicInput").click();
        };
    } else if (item === "✉️ Note") {
        div.onclick = () => {
            const note = prompt("Write a personal note:");
            if (note) {
                localStorage.setItem("userNote", note); // Save note to localStorage
                alert("Note saved!");
            }
        };
    } else if (item === "🌟 Dream") {
        div.onclick = () => {
            const dream = prompt("What did you dream last night?");
            if (dream) {
                localStorage.setItem("userDream", dream);
                alert("Dream saved!");
            }
        };
    }
    memories.appendChild(div);
});

document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
        document.getElementById("snapshotImage").src = e.target.result;
        document.getElementById("imagePreview").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("musicInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const audioURL = URL.createObjectURL(file);
        const musicPlayer = document.getElementById("musicPlayer");
        document.getElementById("musicSource").src = audioURL;
        musicPlayer.style.display = "block";
        musicPlayer.load();
    }
});

window.onload = function () {
    const quote = localStorage.getItem("userQuote");
    const note = localStorage.getItem("userNote");
    const dream = localStorage.getItem("userDream");

    if (quote) alert(`Saved Quote: ${quote}`);
    if (note) alert(`Saved Note: ${note}`);
    if (dream) alert(`Saved Dream: ${dream}`);
};
window.onload = function () {
    const quote = localStorage.getItem("userQuote");
    if (quote) {
        document.getElementById("quoteDisplay").innerHTML = `<p><strong>📖 Saved Quote:</strong> ${quote}</p>`;
    }
    const note = localStorage.getItem("userNote");
    if (note) {
        document.getElementById("noteDisplay").innerHTML = `<p><strong>✉️ Saved Note:</strong> ${note}</p>`;
    }
    const dream = localStorage.getItem("userDream");
    if (dream) {
        document.getElementById("dreamDisplay").innerHTML = `<p><strong>🌟 Saved Dream:</strong> ${dream}</p>`;
    }
};
const quoteMemory = document.querySelector(".memory#quote");
quoteMemory.onclick = () => {
    const quote = prompt("Write your favorite quote:");
    if (quote) {
        localStorage.setItem("userQuote", quote);
        alert("Quote saved!");
        showMemoryVault();
    }
};
function showMemoryVault() {
    const quote = localStorage.getItem("userQuote");
    const note = localStorage.getItem("userNote");
    const dream = localStorage.getItem("userDream");
    const quoteDiv = document.getElementById("quoteDisplay");
    const noteDiv = document.getElementById("noteDisplay");
    const dreamDiv = document.getElementById("dreamDisplay");
    if (quote) quoteDiv.innerHTML = `<p><strong>📖 Saved Quote:</strong> ${quote}</p>`;
    if (note) noteDiv.innerHTML = `<p><strong>✉️ Saved Note:</strong> ${note}</p>`;
    if (dream) dreamDiv.innerHTML = `<p><strong>🌟 Saved Dream:</strong> ${dream}</p>`;
}
window.onload = showMemoryVault;