import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRaceTestStore } from '../../__tests__/helpers/store';
import RaceTrack from '../RaceTrack.vue';

vi.mock('../../assets/horse.svg?raw', () => ({ default: '<svg></svg>' }));

describe('RaceTrack', () => {
  it('renders track structure with lanes and finish line', () => {
    const store = createRaceTestStore();
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.race-track').exists()).toBe(true);
    expect(wrapper.find('.race-track__wrapper').exists()).toBe(true);
    expect(wrapper.find('.race-track__lanes').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'FinishLine' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'LapInfo' }).exists()).toBe(true);
  });

  it('renders 10 lanes', () => {
    const store = createRaceTestStore();
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store] },
    });
    const lanes = wrapper.findAllComponents({ name: 'Lane' });
    expect(lanes).toHaveLength(10);
    expect(lanes[0].props('laneNumber')).toBe(1);
    expect(lanes[9].props('laneNumber')).toBe(10);
  });

  it('passes currentRound horses and progress to lanes', () => {
    const horses = [
      { id: '1', name: 'A', lane: 1, color: 'Red' },
      { id: '2', name: 'B', lane: 2, color: 'Blue' },
    ];
    const currentRound = { roundIndex: 1, distance: 1200, horses };
    const progress = { '1': 30, '2': 45 };
    const store = createRaceTestStore({
      program: { currentRound, items: [currentRound], currentRoundIndex: 0 },
      race: { progress },
    });
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store] },
    });
    const lane1 = wrapper.findAllComponents({ name: 'Lane' })[0];
    expect(lane1.props('horses')).toEqual(horses);
    expect(lane1.props('progress')).toEqual(progress);
  });

  it('passes empty horses and progress when no current round', () => {
    const store = createRaceTestStore();
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store] },
    });
    const firstLane = wrapper.findAllComponents({ name: 'Lane' })[0];
    expect(firstLane.props('horses')).toEqual([]);
    expect(firstLane.props('progress')).toEqual({});
  });

  it('passes currentRound to LapInfo', () => {
    const round = { roundIndex: 2, distance: 1400, horses: [] };
    const store = createRaceTestStore({
      program: { currentRound: round, currentRoundIndex: 1 },
    });
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store] },
    });
    const lapInfo = wrapper.findComponent({ name: 'LapInfo' });
    expect(lapInfo.props('round')).toEqual(round);
  });
});
