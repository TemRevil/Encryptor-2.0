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

function changeText(newText, fontFamily, color) {
    void sectionName.offsetWidth; // Trigger reflow to restart animation
    
    let currentText = sectionName.textContent;
    let maxLength = Math.max(currentText.length, newText.length);
    let tempText = '';
    let i = 0;
    const totalDuration = 1000; // Duration in milliseconds
    const intervalTime = 50; // Interval time in milliseconds
    const steps = totalDuration / intervalTime;
    
    sectionName.style.fontFamily = fontFamily; // Change the font family
    sectionName.style.color = color; // Change the color
    
    let interval = setInterval(() => {
        if (i >= steps) {
            clearInterval(interval);
            sectionName.textContent = newText;
            return;
        }
        
        let randomText = '';
        for (let j = 0; j < maxLength; j++) {
            randomText += String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Generate random ASCII character
        }
        tempText = newText.substring(0, Math.floor((i / steps) * newText.length)) + randomText.substring(Math.floor((i / steps) * newText.length));
        sectionName.textContent = tempText;
        
        i++;
    }, intervalTime);
}

function showSection(sectionId) {
    // Hide the cards-box section
    document.querySelector('.cards-box').classList.add('off');
    
    // Hide all sections first
    document.querySelectorAll('section').forEach(section => {
        if (section.classList.contains('generator') || section.classList.contains('wordlist') || section.classList.contains('passquest')) {
            section.classList.add('off');
        }
    });
    
    // Show the selected section
    document.querySelector(`.${sectionId}`).classList.remove('off');
    
    // Show the close button
    closeButton.classList.remove('off');
}

document.getElementById('Generator').addEventListener('click', () => {
    changeText('Generator', 'Saira', 'var(--french-rose)');
    showSection('generator');
});

document.getElementById('Wordlist').addEventListener('click', () => {
    changeText('Wordlist', 'Spacemono', 'var(--sgbus-green)');
    showSection('wordlist');
});

document.getElementById('PassQuest').addEventListener('click', () => {
    changeText('PassQuest', 'Amatic', 'var(--non-photo-blue)');
    showSection('passquest');
});

closeButton.addEventListener('click', () => {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        if (section.classList.contains('generator') || section.classList.contains('wordlist') || section.classList.contains('passquest')) {
            section.classList.add('off');
        }
    });
    
    // Show the cards-box section
    document.querySelector('.cards-box').classList.remove('off');
    
    // Change the sectionName back to defaultText with default font and color
    changeText(defaultText, defaultFontFamily, defaultColor);
    
    // Hide the close button
    closeButton.classList.add('off');
});
// -----------------------------------------------------------