document.addEventListener('DOMContentLoaded', () => {
    const wordlistInput = document.getElementById('wordlist-input');
    const generateButton = document.getElementById('wordlist-generate');
    const downloadButton = document.getElementById('wordlist-download');
    const wordlistAlert = document.getElementById('wordlist-alert');
    const minRangeInput = document.getElementById('wordlist-range-min');
    const maxRangeInput = document.getElementById('wordlist-range-max');
    const downloadBox = document.getElementById('wordlist-download-box');
    const downloadPercent = document.getElementById('wordlist-download-percent');
    const loadSlider = document.querySelector('.load-slider');

    let generatedContent = '';

    function* generateCombinations(chars, minLen, maxLen, prefix = '') {
        if (prefix.length >= minLen) {
            yield prefix;
        }
        if (prefix.length < maxLen) {
            for (let i = 0; i < chars.length; i++) {
                yield* generateCombinations(chars, minLen, maxLen, prefix + chars[i]);
            }
        }
    }

    generateButton.addEventListener('click', () => {
        const characters = wordlistInput.value.split('');
        const minRange = parseInt(minRangeInput.value);
        const maxRange = parseInt(maxRangeInput.value);

        if (characters.length === 0) {
            wordlistAlert.textContent = 'Please enter characters in the input field';
            wordlistAlert.style.display = 'block';
            setTimeout(() => {
                wordlistAlert.style.display = 'none';
            }, 2000);
            return;
        }

        if (isNaN(minRange) || isNaN(maxRange) || minRange > maxRange || minRange <= 0 || maxRange <= 0) {
            wordlistAlert.textContent = 'Please enter valid min and max range';
            wordlistAlert.style.display = 'block';
            setTimeout(() => {
                wordlistAlert.style.display = 'none';
            }, 2000);
            return;
        }

        const combinations = [];
        for (let combo of generateCombinations(characters, minRange, maxRange)) {
            combinations.push(combo);
        }

        generatedContent = combinations.join('\n');
        wordlistAlert.textContent = 'Wordlist is ready to download';
        wordlistAlert.style.display = 'block';
        setTimeout(() => {
            wordlistAlert.style.display = 'none';
        }, 3000); // Hide alert after 3 seconds
    });

    downloadButton.addEventListener('click', () => {
        if (generatedContent === '') {
            wordlistAlert.textContent = 'Please generate the wordlist first';
            wordlistAlert.style.display = 'block';
            setTimeout(() => {
                wordlistAlert.style.display = 'none';
            }, 2000);
            return;
        }
    
        wordlistAlert.style.display = 'none'; // Hide alert when download button is clicked
        downloadBox.classList.remove('off');
    
        const blob = new Blob([generatedContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.download = 'wordlist.txt';
    
        const reader = new FileReader();
        reader.onload = () => {
            const chunkSize = 1024;
            let offset = 0;
            const chunks = [];
    
            while (offset < generatedContent.length) {
                const chunk = generatedContent.slice(offset, offset + chunkSize);
                chunks.push(chunk);
                offset += chunkSize;
            }
    
            let currentChunk = 0;
            const downloadInterval = setInterval(() => {
                if (currentChunk < chunks.length) {
                    const chunk = chunks[currentChunk];
                    link.href = URL.createObjectURL(new Blob([chunk], { type: 'text/plain' }));
                    link.click();
                    currentChunk++;
                    const progress = Math.round((currentChunk / chunks.length) * 100);
                    downloadPercent.textContent = `${progress}%`;
                    loadSlider.style.width = `${progress}%`;
                } else {
                    clearInterval(downloadInterval);
                    downloadBox.classList.add('off');
                }
            }, 0); // Adjust the interval duration for desired progress speed
        };
        reader.readAsArrayBuffer(blob);
    });
})