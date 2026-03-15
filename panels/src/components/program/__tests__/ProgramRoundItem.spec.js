import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgramRoundItem from '../ProgramRoundItem.vue';

describe('ProgramRoundItem', () => {
  const round = {
    roundIndex: 1,
    distance: 1200,
    horses: [
      { id: '1', name: 'Horse A', lane: 1 },
      { id: '2', name: 'Horse B', lane: 2 },
    ],
  };

  it('renders round title with ordinal and distance', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round, isActive: false },
    });
    expect(wrapper.find('strong').text()).toBe('1ST Lap - 1200m');
  });

  it('renders 2ND for round 2', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round: { ...round, roundIndex: 2, distance: 1400 }, isActive: false },
    });
    expect(wrapper.find('strong').text()).toBe('2ND Lap - 1400m');
  });

  it('renders 3RD for round 3', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round: { ...round, roundIndex: 3, distance: 1600 }, isActive: false },
    });
    expect(wrapper.find('strong').text()).toBe('3RD Lap - 1600m');
  });

  it('renders 4TH for round 4', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round: { ...round, roundIndex: 4 }, isActive: false },
    });
    expect(wrapper.find('strong').text()).toBe('4TH Lap - 1200m');
  });

  it('lists all horses with lane and name', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round, isActive: false },
    });
    const items = wrapper.findAll('.program-round__item');
    expect(items).toHaveLength(2);
    expect(items[0].text()).toContain('Lane 1');
    expect(items[0].text()).toContain('Horse A');
    expect(items[1].text()).toContain('Lane 2');
    expect(items[1].text()).toContain('Horse B');
  });

  it('applies active class when isActive is true', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round, isActive: true },
    });
    expect(wrapper.find('.program-round--active').exists()).toBe(true);
  });

  it('does not apply active class when isActive is false', () => {
    const wrapper = mount(ProgramRoundItem, {
      props: { round, isActive: false },
    });
    expect(wrapper.find('.program-round--active').exists()).toBe(false);
  });
});
