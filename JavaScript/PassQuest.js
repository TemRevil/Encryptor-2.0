const DataQuest = [
    {
        id: 1,
        text: "Your Pass Must Include One Character At Least.",
        validate: (input) => input.length >= 1
    },
    {
        id: 2,
        text: "Your Pass Must Include At Least One Number.",
        validate: (input) => /\d/.test(input)
    },
    {
        id: 3,
        text: "Your Pass Must Be At Least 8 Characters Long.",
        validate: (input) => input.length >= 8
    }
];
// -----------------------------------------------------------
// Main Event
let currentQuestIndex = 0;
let questStarted = false;

function loadNextQuest() {
    const questsContainer = document.getElementById('passquest-quests');
    if (currentQuestIndex < DataQuest.length) {
        const quest = DataQuest[currentQuestIndex];
        const questBox = document.createElement('div');
        questBox.className = 'box flex col gap transition';
        questBox.dataset.questId = quest.id;
        questBox.innerHTML = `
            <p class="align">Quest.${quest.id}</p>
            <hr>
            <p class="text">${quest.text}</p>
        `;
        questsContainer.insertBefore(questBox, questsContainer.firstChild);
    }
}

function checkCurrentQuest() {
    const input = document.getElementById('passquest-input').value;
    if (!questStarted && input.length > 0) {
        questStarted = true;
        loadNextQuest();
    }

    if (currentQuestIndex < DataQuest.length) {
        const quest = DataQuest[currentQuestIndex];
        const questBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
        if (quest.validate(input)) {
            questBox.classList.add('active');
            currentQuestIndex++;
            loadNextQuest();
        } else {
            questBox.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const passquestInput = document.getElementById('passquest-input');
    passquestInput.addEventListener('input', checkCurrentQuest);
});
// -----------------------------------------------------------