export const HORSE_COLOR_MAP = Object.freeze({
  Red: '#e74c3c',
  Blue: '#3498db',
  Yellow: '#f1c40f',
  Green: '#27ae60',
  Orange: '#e67e22',
  Purple: '#9b59b6',
  Pink: '#e91e8c',
  Cyan: '#00bcd4',
  Brown: '#795548',
  Magenta: '#e91e63',
  Lime: '#cddc39',
  Teal: '#009688',
  Navy: '#1976d2',
  Maroon: '#7b1fa2',
  Olive: '#808000',
  Coral: '#ff7f50',
  Indigo: '#3f51b5',
  Crimson: '#dc143c',
  Gold: '#ffd700',
  Silver: '#c0c0c0',
});

const FALLBACK_COLOR = '#888';

export function getColorHex(colorName) {
  return HORSE_COLOR_MAP[colorName] ?? FALLBACK_COLOR;
}
