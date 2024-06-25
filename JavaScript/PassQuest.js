// Data Quest
// Password validation rules
const passwordQuests = [
  {
    id: 1,
    text: "Your Pass Must Include 3 Character At Least.",
    validate: function(input) {
      return input.length >= 3;
    }
  },
  {
    id: 2,
    text: "Your Pass Must Include At Least One Number.",
    validate: function(input) {
      return /\d/.test(input);
    }
  },
  {
    id: 3,
    text: "Your Pass Must Be At Least 8 Characters Long.",
    validate: function(input) {
      return input.length >= 8;
    }
  },
  {
    id: 4,
    text: "Your Pass Must Include At Least One Uppercase Letter.",
    validate: function(input) {
      return /[A-Z]/.test(input);
    }
  },
  {
    id: 5,
    text: "Your Pass Must Include At Least One Special Character.",
    validate: function(input) {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input);
    }
  }
];

// -----------------------------------------------------------
// The Main Event
const MIN_PASSWORD_LENGTH = 3;
const MIN_PASSWORD_LENGTH_EXTENDED = 8;

let currentQuestIndex = 0;
let questStarted = false;

function loadNextQuest() {
  const questsContainer = document.getElementById('passquest-quests');
  if (currentQuestIndex < passwordQuests.length) {
    const quest = passwordQuests[currentQuestIndex];
    const questBox = document.createElement('div');
    questBox.className = 'box flex col gap transition';
    questBox.dataset.questId = quest.id;
    questBox.innerHTML = `
      <p class="align">Quest.${quest.id}</p>
      <hr>
      <p class="text">${quest.text}</p>
    `;
    questsContainer.appendChild(questBox); // Append to the end of the container
  }
}

function checkInput(input) {
  if (!questStarted && input.length > 0) {
    questStarted = true;
    loadNextQuest();
  }
  // Check if the input still matches the previous quests
  for (let i = 0; i < passwordQuests.length; i++) {
    const quest = passwordQuests[i];
    const questBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
    if (quest.validate(input)) {
      // Add active class if input matches the quest
      questBox.classList.add('active');
    } else {
      // Remove active class if input no longer matches the quest
      questBox.classList.remove('active');
    }
  }
}

function validateCurrentQuest(input) {
  if (currentQuestIndex < passwordQuests.length) {
    const quest = passwordQuests[currentQuestIndex];
    const questBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
    if (quest.validate(input)) {
      questBox.classList.add('active');
      currentQuestIndex++;
      loadNextQuest(); // Load the next quest
    } else {
      // Remove active class if input no longer matches the quest
      questBox.classList.remove('active');
    }
  }
}

function addEventListeners() {
  const passquestInput = document.getElementById('passquest-input');
  passquestInput.addEventListener('input', function(event) {
    const input = event.target.value;
    checkInput(input);
    validateCurrentQuest(input);
  });

  const surrenderButton = document.getElementById('passquest-surrender');
  surrenderButton.addEventListener('click', function() {
    if (currentQuestIndex < 3) {
      const alertElement = document.getElementById('passquest-alert');
      alertElement.textContent = 'Come On Give it A Try.';
      setTimeout(function() {
        alertElement.textContent = '';
      }, 3000);
    } else {
      passquestInput.disabled = true; // disable the input field
      passquestInput.readOnly = true; // make the input field read-only
      const alertElement = document.getElementById('passquest-alert');
      alertElement.textContent = 'You have surrendered.';
    }
  });

  const copyButton = document.getElementById('passquest-copy');
  copyButton.addEventListener('click', function() {
    const input = document.getElementById('passquest-input').value;
    const tempInput = document.createElement('input');
    tempInput.value = input;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    const alertElement = document.getElementById('passquest-alert');
    alertElement.textContent = 'Value copied to clipboard.';
    setTimeout(function() {
      alertElement.textContent = '';
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', addEventListeners);
// -----------------------------------------------------------