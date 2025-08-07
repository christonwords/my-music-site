let currentTrack = 0;
let isShuffling = false;
let isLooping = false;

const audio = document.getElementById("audio");
const title = document.getElementById("track-title");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");

function loadTrack(index) {
  const track = musicQueue[index];
  title.textContent = track.title;
  cover.src = track.cover;
  audio.src = track.file;
}

function playTrack() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.onclick = () => {
  if (audio.paused) playTrack();
  else pauseTrack();
};

prevBtn.onclick = () => {
  currentTrack = (currentTrack - 1 + musicQueue.length) % musicQueue.length;
  loadTrack(currentTrack);
  playTrack();
};

nextBtn.onclick = () => {
  if (isShuffling) {
    currentTrack = Math.floor(Math.random() * musicQueue.length);
  } else {
    currentTrack = (currentTrack + 1) % musicQueue.length;
  }
  loadTrack(currentTrack);
  playTrack();
};

shuffleBtn.onclick = () => {
  isShuffling = !isShuffling;
  shuffleBtn.style.backgroundColor = isShuffling ? "#0f0" : "#222";
};

loopBtn.onclick = () => {
  isLooping = !isLooping;
  audio.loop = isLooping;
  loopBtn.style.backgroundColor = isLooping ? "#0f0" : "#222";
};

audio.onended = () => {
  if (!isLooping) nextBtn.onclick();
};

window.onload = () => {
  loadTrack(currentTrack);
  renderTrackList();
};

function renderTrackList() {
  const list = document.getElementById("track-list");
  musicQueue.forEach((track, i) => {
    const div = document.createElement("div");
    div.className = "track-item";
    div.textContent = track.title;
    div.onclick = () => {
      currentTrack = i;
      loadTrack(currentTrack);
      playTrack();
    };
    list.appendChild(div);
  });
}
