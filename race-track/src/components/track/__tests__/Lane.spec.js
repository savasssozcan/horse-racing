import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Lane from '../Lane.vue';

vi.mock('../../assets/horse.svg?raw', () => ({ default: '<svg></svg>' }));

describe('Lane', () => {
  it('renders lane number', () => {
    const wrapper = mount(Lane, {
      props: { laneNumber: 3, horses: [], progress: {} },
    });
    expect(wrapper.find('.lane__number').text()).toBe('3');
  });

  it('filters horses by lane', () => {
    const horses = [
      { id: '1', name: 'A', lane: 1, color: 'Red' },
      { id: '2', name: 'B', lane: 2, color: 'Blue' },
      { id: '3', name: 'C', lane: 1, color: 'Green' },
    ];
    const wrapper = mount(Lane, {
      props: { laneNumber: 1, horses, progress: {} },
    });
    const runners = wrapper.findAllComponents({ name: 'HorseRunner' });
    expect(runners).toHaveLength(2);
    expect(runners[0].props('horse').name).toBe('A');
    expect(runners[1].props('horse').name).toBe('C');
  });

  it('passes progress to HorseRunner', () => {
    const horses = [{ id: 'h1', name: 'H', lane: 1, color: 'Red' }];
    const progress = { h1: 75 };
    const wrapper = mount(Lane, {
      props: { laneNumber: 1, horses, progress },
    });
    const runner = wrapper.findComponent({ name: 'HorseRunner' });
    expect(runner.props('progressPct')).toBe(75);
  });

  it('renders no HorseRunner when no horses in lane', () => {
    const wrapper = mount(Lane, {
      props: { laneNumber: 1, horses: [{ id: '1', lane: 2, name: 'X', color: 'Red' }], progress: {} },
    });
    expect(wrapper.findAllComponents({ name: 'HorseRunner' })).toHaveLength(0);
  });
});
