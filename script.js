document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Mobile Menu Toggle
  // =========================
const menuToggle = document.getElementById("menuToggle"); // Hamburger button
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

// Toggle menu when hamburger clicked
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Hide menu when any menu item is clicked (mobile)
navItems.forEach(item => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
    }
  });
});
  // =========================
  // Intro Typing Animation
  // =========================
  const introLines = ["Hi, I'm Aditi Deshmukh.", "A software engineering student."];
  const container = document.querySelector(".intro-typing");
  let lineIndex = 0, charIndex = 0;

  function typeLine() {
    if (!container) return;
    if (charIndex === 0) {
      const line = document.createElement("span");
      line.classList.add("typing-line");
      container.appendChild(line);
    }
    const currentLine = container.children[lineIndex];
    if (!currentLine) return;
    if (charIndex < introLines[lineIndex].length) {
      currentLine.textContent += introLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 50);
    } else {
      lineIndex++;
      charIndex = 0;
      if (lineIndex < introLines.length) setTimeout(typeLine, 800);
    }
  }
  typeLine();

  // =========================
  // Canvas Galaxy Background
  // =========================
  const canvas = document.createElement('canvas');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const STAR_COUNT = 400;
  const stars = [];
  for (let i = 0; i < STAR_COUNT; i++) stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, z: Math.random()*canvas.width });

  function drawStars() {
    ctx.fillStyle = '#000010';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    stars.forEach(star => {
      star.z -= 0.5;
      if (star.z <= 0) { star.z = canvas.width; star.x=Math.random()*canvas.width; star.y=Math.random()*canvas.height; }
      const k = 128.0/star.z;
      const px = (star.x - canvas.width/2)*k + canvas.width/2;
      const py = (star.y - canvas.height/2)*k + canvas.height/2;
      const size = (1 - star.z/canvas.width) * 2;
      const opacity = 1 - star.z/canvas.width;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
  window.addEventListener('resize', () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

  // =========================
  // About Timeline Scroll Reveal
  // =========================
  const aboutSection = document.querySelector(".journey-section");
  const timelineItems = document.querySelectorAll('.timeline-item');

  function revealAbout() {
    const trigger = window.innerHeight * 0.8;
    if(aboutSection.getBoundingClientRect().top < trigger){
      aboutSection.classList.add('show');
      timelineItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('show'), index*700);
      });
      window.removeEventListener('scroll', revealAbout);
    }
  }

  window.addEventListener('scroll', revealAbout);
  revealAbout();
});







const eduText = [
  "Passionate about learning new technologies...",
  "Looking for internships to grow my skills...",
  "Aspiring Software Engineer in the making!"
];

let eduIndex = 0;
let eduCharIndex = 0;
const eduTypingElement = document.getElementById("edu-typing");

function typeEdu() {
  if (eduCharIndex < eduText[eduIndex].length) {
    eduTypingElement.textContent += eduText[eduIndex].charAt(eduCharIndex);
    eduCharIndex++;
    setTimeout(typeEdu, 100);
  } else {
    setTimeout(eraseEdu, 2000);
  }
}

function eraseEdu() {
  if (eduCharIndex > 0) {
    eduTypingElement.textContent = eduText[eduIndex].substring(0, eduCharIndex - 1);
    eduCharIndex--;
    setTimeout(eraseEdu, 50);
  } else {
    eduIndex = (eduIndex + 1) % eduText.length;
    setTimeout(typeEdu, 500);
  }
}

typeEdu();


const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
let currentTab = 0;
let autoSwitchInterval;

function activateTab(index) {
  // Reset all
  tabButtons.forEach(btn => btn.classList.remove("active"));
  tabContents.forEach(content => {
    content.classList.remove("active");
    content.querySelectorAll("span").forEach(bar => {
      bar.style.width = "0"; // reset
    });
  });

  // Activate selected
  tabButtons[index].classList.add("active");
  const activeTab = tabContents[index];
  activeTab.classList.add("active");

  // Animate bars
  setTimeout(() => {
    activeTab.querySelectorAll("span").forEach(bar => {
      const targetWidth = bar.dataset.width;
      bar.style.width = targetWidth;
    });
  }, 200);
}

// Manual click
tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    clearInterval(autoSwitchInterval);
    currentTab = index;
    activateTab(currentTab);
    startAutoSwitch();
  });
});

// Auto switch
function startAutoSwitch() {
  autoSwitchInterval = setInterval(() => {
    currentTab = (currentTab + 1) % tabButtons.length;
    activateTab(currentTab);
  }, 4000);
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  activateTab(currentTab);
  startAutoSwitch();
});


