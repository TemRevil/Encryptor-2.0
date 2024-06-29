// Data Quest
// Password validation rules
const passwordQuests = [
  {
    id: 1,
    text: "Your Pass Must Include 4 Character At Least.",
    validate: function(input) {
      return input.length >= 4;
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
    text: "Your Pass Must Include At Least One Uppercase Letter.",
    validate: function(input) {
      return /[A-Z]/.test(input);
    }
  },
  {
    id: 4,
    text: "Your Pass Must Include At Least One Special Character.",
    validate: function(input) {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input);
    }
  },
  {
    id: 5,
    text: "Your Pass Must Include At Least One Month Name.",
    validate: function(input) {
      const monthRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)/i;
      return monthRegex.test(input);
    }
  },
  {
    id: 6,
    text: "Your Pass Must Include At Least One Country Name.",
    validate: function(input) {
      const countryNames = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
        "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
        "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor-Leste)", "Ecuador", "Egypt", "El Salvador",
        "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
        "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
        "Indonesia", "Iran", "Iraq", "Ireland", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
        "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
        "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
        "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
        "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
        "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "UnitedKingdom", "United States", "UnitedStates", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
      ];
      const countryRegexPattern = new RegExp(`(${countryNames.join('|')})`, 'i');
      return countryRegexPattern.test(input);
    }
  },
  {
    id: 7,
    text: "The Sum Of All Numbers In Your Pass Must Be 25.",
    validate: function(input) {
      const numbersSum = input
        .split('')
        .map(char => parseInt(char))
        .filter(value => !isNaN(value))
        .reduce((sum, value) => sum + value, 0);
      return numbersSum === 25;
    }
  },
  {
    id: 8,
    text: 'Your Pass Must Include One Of Our Sponsors <div class="flex row gap"><div class="img"><img src="Background/Icons/Microsoft.svg" alt="Microsoft"></div><div class="img"><img src="Background/Icons/Netflix.svg" alt="Netflix"></div><div class="img"><img src="Background/Icons/Playstation.svg" alt="Playstation"></div></div>',
    validate: function(input) {
      const sponsors = ['Microsoft', 'Netflix', 'Playstation', 'microsoft', 'netflix', 'playstation'];
      return sponsors.some(sponsor => input.includes(sponsor));
    }
  },
  {
    id: 9,
    text: "Your Pass Must Include At Least One Element From The Periodic Table.",
    validate: function(input) {
      const periodicTableSymbols = [
        'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ar', 'Ca',
        'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Ni', 'Co', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
        'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
        'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
        'Tl', 'Pb', 'Bi', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg',
        'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
      ];
      const enteredPassword = input.toUpperCase();
      return periodicTableSymbols.some(symbol => enteredPassword.includes(symbol));
    }
  },
  {
    id: 10,
    text: "Your Pass Must Include At Least One City Name.",
    validate: function(input) {
      const cityNames = [
        "Cairo", "Lagos", "Cape Town", "Nairobi", "Algiers", "Sydney", "Melbourne", "Brisbane", "Auckland", "Perth",
        "London", "Paris", "Berlin", "Moscow", "Madrid", "Rome", "Stockholm", "Athens", "Dublin", "Vienna",
        "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
        "Beijing", "Shanghai", "Tokyo", "Seoul", "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Jakarta",
        "São Paulo", "Buenos Aires", "Rio de Janeiro", "Lima", "Bogotá", "Santiago", "Caracas", "Quito", "La Paz", "Asunción",
        "Mexico City", "Guadalajara", "Monterrey", "Havana", "San Salvador", "Tegucigalpa", "Managua", "San José", "Panama City", "Kingston",
        "Rabat", "Tunis", "Accra", "Kinshasa", "Dakar", "Khartoum", "Dar es Salaam", "Addis Ababa", "Luanda", "Lusaka",
        "Casablanca", "Abuja", "Douala", "Ibadan", "Kano", "Lomé", "Bamako", "Ouagadougou", "Antananarivo", "Maputo"
      ];
      const cityRegexPattern = new RegExp(`(${cityNames.join('|')})`, 'i');
      return cityRegexPattern.test(input);
    }
  },
  {
    id: 11,
    text: "Your Pass Must Include At Least One Color Name.",
    validate: function(input) {
      const colorNames = [
        "AliceBlue", "AntiqueWhite", "Beige", "Bisque", "BlanchedAlmond", "BurlyWood", "Cornsilk", "Gainsboro", "GhostWhite", "Honeydew",
        "Ivory", "Lavender", "LavenderBlush", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen",
        "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "MintCream", "MistyRose", "Moccasin",
        "DimGray", "FireBrick", "ForestGreen", "MediumBlue", "MediumSlateBlue", "MidnightBlue", "SaddleBrown", "Sienna", "SlateGray", "SteelBlue",
        "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Gray", "Black", "White"
      ];

      const colorRegexPattern = new RegExp(`(${colorNames.join('|')})`, 'i');
      return colorRegexPattern.test(input);
    }
  },
  {
    id: 12,
    text: "Your Pass Must Include At Least One Fruit Name.",
    validate: function(input) {
      const fruitNames = [
        "apple", "orange", "banana", "grape", "strawberry", "watermelon", "kiwi", "mango", "pineapple", "peach",
        "pear", "plum", "cherry", "lemon", "lime", "blueberry", "raspberry", "blackberry", "avocado", "coconut",
        "fig", "grapefruit", "pomegranate", "papaya", "apricot", "nectarine", "cranberry", "cantaloupe", "honeydew", "date",
        "dragon fruit", "guava", "kiwifruit", "passion fruit", "lychee", "mango", "persimmon", "star fruit", "watermelon", "elderberry",
        "boysenberry", "kiwano", "ackee", "breadfruit", "carambola", "currant", "feijoa", "jambul", "kumquat", "loquat",
        "longan", "salak", "sapote", "soursop", "ugli fruit", "yuzu", "plantain", "rambutan", "tamarillo", "tamarind",
        "ugli fruit", "yuzu"
      ];
      const fruitRegexPattern = new RegExp(`(${fruitNames.join('|')})`, 'i');
      const enteredPassword = input.trim().toLowerCase();
      return fruitRegexPattern.test(enteredPassword);
    }
  },
  {
    id: 13,
    text: "Your Pass Must Include At Least One Day Of The Week.",
    validate: function(input) {
      const daysOfWeek = [
        "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
      ];
      const daysOfWeekRegexPattern = new RegExp(`(${daysOfWeek.join('|')})`, 'i');
      const enteredPassword = input.trim().toLowerCase();
      return daysOfWeekRegexPattern.test(enteredPassword);
    }
  }
];
// -----------------------------------------------------------
// The Main Event
let currentQuestIndex = 0;
let questStarted = false;

function loadNextQuest() {
  const questsContainer = document.getElementById('passquest-quests');
  if (currentQuestIndex < passwordQuests.length) {
    const quest = passwordQuests[currentQuestIndex];
    const existingQuestBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
    if (!existingQuestBox) {
      const questBox = document.createElement('div');
      questBox.className = 'box flex col gap transition';
      questBox.dataset.questId = quest.id;
      questBox.innerHTML = `
        <p class="align">Quest.${quest.id}</p>
        <hr>
        <p class="text">${quest.text}</p>
      `;
      questsContainer.prepend(questBox); // Prepend to the beginning of the container
    }
  } else {
    // Display congratulations message when all quests are completed
    const alertElement = document.getElementById('passquest-alert');
    alertElement.textContent = 'Congratulations!';
    alertElement.classList.add('congrats');
  }
}

function validateCurrentQuest(input) {
  if (currentQuestIndex < passwordQuests.length) {
    const quest = passwordQuests[currentQuestIndex];
    const questBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
    if (questBox !== null) {
      if (quest.validate(input)) {
        questBox.classList.add('active');
        currentQuestIndex++;
        loadNextQuest(); // Load the next quest
      } else {
        questBox.classList.remove('active');
      }
    }
  }
}

function checkInput(input) {
  if (!questStarted && input.length > 0) {
    questStarted = true;
    loadNextQuest();
  }
  // Only check the current quest
  validateCurrentQuest(input);

  // Update character count
  const characterCount = input.length;
  const passquestInputNum = document.getElementById('passquest-input-num');
  passquestInputNum.textContent = characterCount;
}

function addEventListeners() {
  const passquestInput = document.getElementById('passquest-input');
  passquestInput.addEventListener('input', function(event) {
    const input = event.target.value;
    checkInput(input);
    handleQuestClearing(input);
  });

  passquestInput.addEventListener('keyup', function(event) {
    const input = event.target.value;
    checkInput(input);
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
      passquestInput.disabled = true;
      passquestInput.readOnly = true;
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
    alertElement.textContent = 'Copied!';
    setTimeout(function() {
      alertElement.textContent = '';
    }, 3000);
  });
  
  // New listener to handle input clearing
  passquestInput.addEventListener('input', function(event) {
    const input = event.target.value;
    handleQuestClearing(input);
  });
}

function handleQuestClearing(input) {
  let validUpTo = -1;
  for (let i = 0; i <= currentQuestIndex; i++) {
    const quest = passwordQuests[i];
    const questBox = document.querySelector(`div[data-quest-id='${quest.id}']`);
    if (questBox !== null) {
      if (quest.validate(input)) {
        questBox.classList.add('active');
        validUpTo = i;
      } else {
        questBox.classList.remove('active');
        if (i <= currentQuestIndex) {
          currentQuestIndex = i;
        }
      }
    }
  }
  // Remove active class from subsequent quests
  for (let i = validUpTo + 1; i < passwordQuests.length; i++) {
    const questBox = document.querySelector(`div[data-quest-id='${passwordQuests[i].id}']`);
    if (questBox !== null) {
      questBox.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  addEventListeners();
});
// -----------------------------------------------------------