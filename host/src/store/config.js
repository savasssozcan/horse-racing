export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

export const HORSE_NAMES = [
  'Bold Pilot', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
  'Katherine Johnson', 'Hedy Lamarr', 'Barbara Liskov', 'Frances Allen',
  'Carol Shaw', 'Radia Perlman', 'Jean Sammet', 'Mary Wilkes',
  'Adele Goldberg', 'Sister Mary Keller', 'Elizabeth Feinler', 'Anita Borg',
  'Karen Spärck Jones', 'Shafi Goldwasser', 'Laura Haas', 'Ruzena Bajcsy',
];

export const HORSE_COLORS = [
  'Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'Cyan',
  'Brown', 'Magenta', 'Lime', 'Teal', 'Navy', 'Maroon', 'Olive', 'Coral',
  'Indigo', 'Crimson', 'Gold', 'Silver',
];

export const RACE_DURATION_MS = 8000;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createHorse(id, name, condition, color) {
  return { id, name, condition, color };
}

export function randomCondition() {
  return randomInt(1, 100);
}
