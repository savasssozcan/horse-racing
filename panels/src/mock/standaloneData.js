const HORSE_NAMES = [
  'Adele Goldberg', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
  'Katherine Johnson', 'Hedy Lamarr', 'Barbara Liskov', 'Frances Allen',
  'Carol Shaw', 'Radia Perlman', 'Jean Sammet', 'Mary Wilkes',
  'Shafi Goldwasser', 'Sister Mary Keller', 'Elizabeth Feinler', 'Anita Borg',
  'Karen Spärck Jones', 'Laura Haas', 'Ruzena Bajcsy', 'Bold Pilot',
];

const ROUND_DISTANCES = [1200, 1400, 1600, 1800];

function createHorse(id, name, lane) {
  return { id: `horse-${id}`, name, lane };
}

function buildMockHorses() {
  return HORSE_NAMES.map((name, i) =>
    createHorse(i + 1, name, (i % 10) + 1)
  );
}

function buildMockProgram() {
  const horses = buildMockHorses();
  return ROUND_DISTANCES.map((distance, index) => {
    const start = (index * 10) % 20;
    const selected = [];
    for (let i = 0; i < 10; i++) {
      const h = horses[(start + i) % 20];
      selected.push({ ...h, lane: i + 1 });
    }
    return {
      roundIndex: index + 1,
      distance,
      horses: selected,
    };
  });
}

function buildMockResults() {
  const program = buildMockProgram();
  return program.slice(0, 3).map((round) => ({
    roundIndex: round.roundIndex,
    distance: round.distance,
    positions: round.horses.map((h) => ({ name: h.name })),
  }));
}

export function getStandaloneMockData() {
  return {
    horses: buildMockHorses(),
    program: buildMockProgram(),
    results: buildMockResults(),
    currentRoundIndex: 0,
  };
}
