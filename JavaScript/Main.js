// Nav Links
const navLinks = {
    home: document.getElementById('home-link'),
    team: document.getElementById('team-link')
};
const navSections = {
    home: document.querySelector('.home'),
    team: document.querySelector('.team')
};
Object.keys(navLinks).forEach(key => {
    navLinks[key].addEventListener('click', event => {
    event.preventDefault();
    Object.keys(navSections).forEach(k => navSections[k].classList.toggle('off', k!== key));
    });
});
// -----------------------------------------------------------
// Light - Dark Mode Toggle Event
const lightModeButton = document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');
const themeStylesheet = document.getElementById('theme-stylesheet');
const canvasStylesheet = document.getElementById('canvas-stylesheet');

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'CSS/Main.css';
    const canvasTheme = localStorage.getItem('canvasTheme') || 'CSS/Canvas.css';
    themeStylesheet.setAttribute('href', theme);
    canvasStylesheet.setAttribute('href', canvasTheme);
});

lightModeButton.addEventListener('click', () => {
    themeStylesheet.setAttribute('href', 'CSS/Main-Light.css');
    canvasStylesheet.setAttribute('href', 'CSS/Canvas-Light.css');
    localStorage.setItem('theme', 'CSS/Main-Light.css');
    localStorage.setItem('canvasTheme', 'CSS/Canvas-Light.css');
});

darkModeButton.addEventListener('click', () => {
    themeStylesheet.setAttribute('href', 'CSS/Main.css');
    canvasStylesheet.setAttribute('href', 'CSS/Canvas.css');
    localStorage.setItem('theme', 'CSS/Main.css');
    localStorage.setItem('canvasTheme', 'CSS/Canvas.css');
});
// -----------------------------------------------------------
// section-name event listeners
const sectionName = document.getElementById('section-name');
const closeButton = document.getElementById('close-section');
const defaultText = 'Home';
const defaultFontFamily = 'rubik';
const defaultColor = 'var(--ghost-white)';

const homeSections = {
  Generator: { text: 'Generator', fontFamily: 'Saira', color: 'var(--french-rose)' },
  Wordlist: { text: 'Wordlist', fontFamily: 'Spacemono', color: 'var(--sgbus-green)' },
  PassQuest: { text: 'PassQuest', fontFamily: 'Amatic', color: 'var(--non-photo-blue)' }
};

function changeText(newText, fontFamily, color) {
  sectionName.style.fontFamily = fontFamily;
  sectionName.style.color = color;
  
  let currentText = sectionName.textContent;
  let maxLength = Math.max(currentText.length, newText.length);
  let i = 0;
  const totalDuration = 1000;
  const intervalTime = 50;
  const steps = totalDuration / intervalTime;
  
  let interval = setInterval(() => {
    if (i >= steps) {
      clearInterval(interval);
      sectionName.textContent = newText;
      return;
    }
    
    let randomText = '';
    for (let j = 0; j < maxLength; j++) {
      randomText += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }
    sectionName.textContent = newText.substring(0, Math.floor((i / steps) * newText.length)) + randomText.substring(Math.floor((i / steps) * newText.length));
    
    i++;
  }, intervalTime);
}

function toggleSection(sectionId, show) {
  document.querySelector(`.${sectionId}`).classList.toggle('off',!show);
}

Object.keys(homeSections).forEach(key => {
  document.getElementById(key).addEventListener('click', () => {
    changeText(homeSections[key].text, homeSections[key].fontFamily, homeSections[key].color);
    toggleSection(key.toLowerCase(), true);
    toggleSection('cards-box', false);
    closeButton.classList.remove('off');
  });
});

closeButton.addEventListener('click', () => {
  Object.keys(homeSections).forEach(key => toggleSection(key.toLowerCase(), false));
  toggleSection('cards-box', true);
  changeText(defaultText, defaultFontFamily, defaultColor);
  closeButton.classList.add('off');
});
// -----------------------------------------------------------