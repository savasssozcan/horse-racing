import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HorseRunner from '../HorseRunner.vue';

vi.mock('../../assets/horse.svg?raw', () => ({ default: '<svg></svg>' }));

describe('HorseRunner', () => {
  const horse = { id: '1', name: 'Test Horse', color: 'Red' };

  it('renders horse name', () => {
    const wrapper = mount(HorseRunner, {
      props: { horse, progressPct: 0 },
    });
    expect(wrapper.find('.horse-runner__name').text()).toBe('Test Horse');
  });

  it('applies left position based on progress', () => {
    const wrapper = mount(HorseRunner, {
      props: { horse, progressPct: 50 },
    });
    const style = wrapper.find('.horse-runner').attributes('style') || '';
    expect(style).toContain('left: 50%');
  });

  it('caps progress at 100%', () => {
    const wrapper = mount(HorseRunner, {
      props: { horse, progressPct: 150 },
    });
    const style = wrapper.find('.horse-runner').attributes('style') || '';
    expect(style).toContain('left: 100%');
  });

  it('renders HorseIcon with color from horse', () => {
    const wrapper = mount(HorseRunner, {
      props: { horse: { ...horse, color: 'Blue' }, progressPct: 0 },
    });
    const icon = wrapper.findComponent({ name: 'HorseIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.props('color')).toBe('#3498db');
  });
});
