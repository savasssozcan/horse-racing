const HORSE_NAMES = [
  'Adele Goldberg', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
  'Katherine Johnson', 'Hedy Lamarr', 'Barbara Liskov', 'Frances Allen',
  'Carol Shaw', 'Radia Perlman',
];

function buildMockProgram() {
  const horses = HORSE_NAMES.map((name, i) => ({
    id: `horse-${i + 1}`,
    name: HORSE_NAMES[i],
    lane: i + 1,
  }));
  return [
    {
      roundIndex: 1,
      distance: 1200,
      horses,
    },
  ];
}

function buildMockProgress() {
  const pct = [0, 18, 35, 52, 68, 82, 95, 100, 100, 100];
  const progress = {};
  for (let i = 0; i < 10; i++) {
    progress[`horse-${i + 1}`] = pct[i];
  }
  return progress;
}

export function getStandaloneMockData() {
  return {
    program: buildMockProgram(),
    currentRoundIndex: 0,
    progress: buildMockProgress(),
  };
}
