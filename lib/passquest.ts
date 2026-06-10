// PassQuest rules — each "quest" is a constraint the password must satisfy. Ported
// verbatim from the original PassQuest.js (same order, same validation logic).

export interface Quest {
  id: number;
  text: string;
  /** Optional sponsor logos rendered under the quest text (quest 8). */
  sponsors?: { src: string; alt: string }[];
  validate: (input: string) => boolean;
}

const COUNTRY_NAMES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
  'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
  'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'UnitedKingdom', 'United States', 'UnitedStates', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

const PERIODIC_SYMBOLS = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ar', 'Ca',
  'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Ni', 'Co', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
  'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
  'Tl', 'Pb', 'Bi', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg',
  'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og',
];

const CITY_NAMES = [
  'Cairo', 'Lagos', 'Cape Town', 'Nairobi', 'Algiers', 'Sydney', 'Melbourne', 'Brisbane', 'Auckland', 'Perth',
  'London', 'Paris', 'Berlin', 'Moscow', 'Madrid', 'Rome', 'Stockholm', 'Athens', 'Dublin', 'Vienna',
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Beijing', 'Shanghai', 'Tokyo', 'Seoul', 'Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Jakarta',
  'São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima', 'Bogotá', 'Santiago', 'Caracas', 'Quito', 'La Paz', 'Asunción',
  'Mexico City', 'Guadalajara', 'Monterrey', 'Havana', 'San Salvador', 'Tegucigalpa', 'Managua', 'San José', 'Panama City', 'Kingston',
  'Rabat', 'Tunis', 'Accra', 'Kinshasa', 'Dakar', 'Khartoum', 'Dar es Salaam', 'Addis Ababa', 'Luanda', 'Lusaka',
  'Casablanca', 'Abuja', 'Douala', 'Ibadan', 'Kano', 'Lomé', 'Bamako', 'Ouagadougou', 'Antananarivo', 'Maputo',
];

const COLOR_NAMES = [
  'AliceBlue', 'AntiqueWhite', 'Beige', 'Bisque', 'BlanchedAlmond', 'BurlyWood', 'Cornsilk', 'Gainsboro', 'GhostWhite', 'Honeydew',
  'Ivory', 'Lavender', 'LavenderBlush', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen',
  'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'MintCream', 'MistyRose', 'Moccasin',
  'DimGray', 'FireBrick', 'ForestGreen', 'MediumBlue', 'MediumSlateBlue', 'MidnightBlue', 'SaddleBrown', 'Sienna', 'SlateGray', 'SteelBlue',
  'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Black', 'White',
];

const FRUIT_NAMES = [
  'apple', 'orange', 'banana', 'grape', 'strawberry', 'watermelon', 'kiwi', 'mango', 'pineapple', 'peach',
  'pear', 'plum', 'cherry', 'lemon', 'lime', 'blueberry', 'raspberry', 'blackberry', 'avocado', 'coconut',
  'fig', 'grapefruit', 'pomegranate', 'papaya', 'apricot', 'nectarine', 'cranberry', 'cantaloupe', 'honeydew', 'date',
  'dragon fruit', 'guava', 'kiwifruit', 'passion fruit', 'lychee', 'persimmon', 'star fruit', 'elderberry',
  'boysenberry', 'kiwano', 'ackee', 'breadfruit', 'carambola', 'currant', 'feijoa', 'jambul', 'kumquat', 'loquat',
  'longan', 'salak', 'sapote', 'soursop', 'ugli fruit', 'yuzu', 'plantain', 'rambutan', 'tamarillo', 'tamarind',
];

const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const anyOf = (list: string[], flags = 'i') => new RegExp(`(${list.map(escapeRegex).join('|')})`, flags);

export const passwordQuests: Quest[] = [
  { id: 1, text: 'Your Pass Must Include 4 Character At Least.', validate: (i) => i.length >= 4 },
  { id: 2, text: 'Your Pass Must Include At Least One Number.', validate: (i) => /\d/.test(i) },
  { id: 3, text: 'Your Pass Must Include At Least One Uppercase Letter.', validate: (i) => /[A-Z]/.test(i) },
  { id: 4, text: 'Your Pass Must Include At Least One Special Character.', validate: (i) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(i) },
  { id: 5, text: 'Your Pass Must Include At Least One Month Name.', validate: (i) => /(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(i) },
  { id: 6, text: 'Your Pass Must Include At Least One Country Name.', validate: (i) => anyOf(COUNTRY_NAMES).test(i) },
  {
    id: 7,
    text: 'The Sum Of All Numbers In Your Pass Must Be 25.',
    validate: (i) => i.split('').map((c) => parseInt(c)).filter((v) => !isNaN(v)).reduce((s, v) => s + v, 0) === 25,
  },
  {
    id: 8,
    text: 'Your Pass Must Include One Of Our Sponsors',
    sponsors: [
      { src: '/Background/Icons/Microsoft.svg', alt: 'Microsoft' },
      { src: '/Background/Icons/Netflix.svg', alt: 'Netflix' },
      { src: '/Background/Icons/Playstation.svg', alt: 'Playstation' },
    ],
    validate: (i) => ['Microsoft', 'Netflix', 'Playstation', 'microsoft', 'netflix', 'playstation'].some((s) => i.includes(s)),
  },
  {
    id: 9,
    text: 'Your Pass Must Include At Least One Element From The Periodic Table.',
    validate: (i) => { const up = i.toUpperCase(); return PERIODIC_SYMBOLS.some((s) => up.includes(s.toUpperCase())); },
  },
  { id: 10, text: 'Your Pass Must Include At Least One City Name.', validate: (i) => anyOf(CITY_NAMES).test(i) },
  { id: 11, text: 'Your Pass Must Include At Least One Color Name.', validate: (i) => anyOf(COLOR_NAMES).test(i) },
  { id: 12, text: 'Your Pass Must Include At Least One Fruit Name.', validate: (i) => anyOf(FRUIT_NAMES).test(i.trim().toLowerCase()) },
  { id: 13, text: 'Your Pass Must Include At Least One Day Of The Week.', validate: (i) => anyOf(DAYS_OF_WEEK).test(i.trim().toLowerCase()) },
];
