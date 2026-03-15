import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LapInfo from '../LapInfo.vue';

describe('LapInfo', () => {
  it('renders empty when no round', () => {
    const wrapper = mount(LapInfo, {
      props: { round: null },
    });
    expect(wrapper.find('.lap-info').text()).toBe('');
  });

  it('renders lap label with ordinal and distance', () => {
    const wrapper = mount(LapInfo, {
      props: {
        round: { roundIndex: 1, distance: 1200 },
      },
    });
    expect(wrapper.find('.lap-info').text()).toBe('1ST Lap 1200m');
  });

  it('renders 2ND and 3RD correctly', () => {
    const wrapper2 = mount(LapInfo, {
      props: { round: { roundIndex: 2, distance: 1400 } },
    });
    expect(wrapper2.find('.lap-info').text()).toBe('2ND Lap 1400m');

    const wrapper3 = mount(LapInfo, {
      props: { round: { roundIndex: 3, distance: 1600 } },
    });
    expect(wrapper3.find('.lap-info').text()).toBe('3RD Lap 1600m');
  });

  it('renders 4TH for round 4', () => {
    const wrapper = mount(LapInfo, {
      props: { round: { roundIndex: 4, distance: 1800 } },
    });
    expect(wrapper.find('.lap-info').text()).toBe('4TH Lap 1800m');
  });
});
