import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestStore } from '../../__tests__/helpers/store';
import ProgramResults from '../ProgramResults.vue';

vi.mock('overlayscrollbars-vue', () => ({
  OverlayScrollbarsComponent: {
    name: 'OverlayScrollbarsComponent',
    template: '<div class="mock-scroll"><slot /></div>',
  },
}));

describe('ProgramResults', () => {
  it('renders Program and Results panels', () => {
    const store = createTestStore();
    const wrapper = mount(ProgramResults, {
      global: { plugins: [store] },
    });
    const panels = wrapper.findAllComponents({ name: 'Panel' });
    expect(panels).toHaveLength(2);
    expect(panels[0].props('title')).toBe('Program');
    expect(panels[0].props('variant')).toBe('program');
    expect(panels[1].props('title')).toBe('Results');
    expect(panels[1].props('variant')).toBe('results');
  });

  it('shows empty messages when no program and no results', () => {
    const store = createTestStore();
    const wrapper = mount(ProgramResults, {
      global: { plugins: [store] },
    });
    const emptyParagraphs = wrapper.findAll('.program-results__empty');
    expect(emptyParagraphs).toHaveLength(2);
    expect(emptyParagraphs[0].text()).toContain('Generate program');
    expect(emptyParagraphs[1].text()).toContain('No results');
  });

  it('renders ProgramRoundItems when program has rounds', () => {
    const program = [
      { roundIndex: 1, distance: 1200, horses: [{ id: '1', name: 'A', lane: 1 }] },
    ];
    const store = createTestStore({
      program: { items: program, currentRoundIndex: -1 },
    });
    const wrapper = mount(ProgramResults, {
      global: { plugins: [store] },
    });
    const roundItems = wrapper.findAllComponents({ name: 'ProgramRoundItem' });
    expect(roundItems).toHaveLength(1);
    expect(roundItems[0].props('round')).toEqual(program[0]);
    expect(roundItems[0].props('isActive')).toBe(false);
  });

  it('marks current round as active', () => {
    const program = [
      { roundIndex: 1, distance: 1200, horses: [] },
      { roundIndex: 2, distance: 1400, horses: [] },
    ];
    const store = createTestStore({
      program: { items: program, currentRoundIndex: 1 },
    });
    const wrapper = mount(ProgramResults, {
      global: { plugins: [store] },
    });
    const roundItems = wrapper.findAllComponents({ name: 'ProgramRoundItem' });
    expect(roundItems[0].props('isActive')).toBe(false);
    expect(roundItems[1].props('isActive')).toBe(true);
  });

  it('renders ResultRoundItems when results exist', () => {
    const results = [
      { roundIndex: 1, distance: 1200, positions: [{ name: 'Winner' }, { name: 'Second' }] },
    ];
    const store = createTestStore({ results: { items: results } });
    const wrapper = mount(ProgramResults, {
      global: { plugins: [store] },
    });
    const resultItems = wrapper.findAllComponents({ name: 'ResultRoundItem' });
    expect(resultItems).toHaveLength(1);
    expect(resultItems[0].props('round')).toEqual(results[0]);
  });
});
