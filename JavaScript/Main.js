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

// Nav Responsive Box
document.addEventListener('DOMContentLoaded', () => {
  const navCollapseButton = document.getElementById('nav-collapse');
  const navCollapseBox = document.getElementById('nav-collapse-box');
  const navContainer = document.getElementById('nav-container');
  const elementsToToggle = [...document.querySelectorAll('#home-link, #team-link,.drop-box')];
  let elementsInCollapseBox = false;

  const toggleElements = (parent) => {
    elementsToToggle.forEach((element) => parent.appendChild(element));
    elementsInCollapseBox = parent === navCollapseBox;
  };

  const toggleLinks = (display) => {
    document.querySelectorAll('nav.links').forEach((link) => (link.style.display = display));
  };

  navCollapseButton.addEventListener('click', () => {
    toggleElements(elementsInCollapseBox? navContainer : navCollapseBox);
    toggleLinks(elementsInCollapseBox? 'none' : 'block');
  });

  window.addEventListener('resize', () => {
    const parent = window.innerWidth > 425? navContainer : navCollapseBox;
    toggleElements(parent);
    toggleLinks(window.innerWidth > 425? 'block' : 'none');
  });
});
// -----------------------------------------------------------
// Light - Dark Mode Toggle Event
const lightModeButton = document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');
const themeStylesheet = document.getElementById('theme-stylesheet');

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'CSS/Main.css';
    themeStylesheet.setAttribute('href', theme);
});

lightModeButton.addEventListener('click', () => {
    themeStylesheet.setAttribute('href', 'CSS/Main-Light.css');
    localStorage.setItem('theme', 'CSS/Main-Light.css');
});

darkModeButton.addEventListener('click', () => {
    themeStylesheet.setAttribute('href', 'CSS/Main.css');
    localStorage.setItem('theme', 'CSS/Main.css');
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
// Cards IMG Rsponsive Move
const reorderCards = () => {
  const isNarrow = window.innerWidth < 734;
  document.querySelectorAll('.card').forEach((card) => {
    const imgDiv = card.querySelector('.img');
    const cardData = card.querySelector('.card-data');
    card.insertBefore(imgDiv, isNarrow? card.firstChild : cardData.nextSibling);
  });
};

window.addEventListener('resize', reorderCards);
reorderCards();
// -----------------------------------------------------------
// Team Links Buttons
document.addEventListener('DOMContentLoaded', function() {
  const temrevilButton = document.getElementById('temrevil');
  const eslamButton = document.getElementById('eslam');
  
  temrevilButton.addEventListener('click', function() {
    window.open('https://temrevil.github.io/revil/Index.html', '_blank');
  });
  eslamButton.addEventListener('click', function() {
    window.open('#', '_blank');
  });
});
// -----------------------------------------------------------