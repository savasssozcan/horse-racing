import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HorseIcon from '../HorseIcon.vue';

vi.mock('../../assets/horse.svg?raw', () => ({ default: '<svg data-test="horse-svg"></svg>' }));

describe('HorseIcon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders svg content', () => {
    const wrapper = mount(HorseIcon);
    expect(wrapper.find('.horse-icon').exists()).toBe(true);
    expect(wrapper.find('.horse-icon').html().toLowerCase()).toContain('svg');
  });

  it('applies color style', () => {
    const wrapper = mount(HorseIcon, {
      props: { color: '#e74c3c' },
    });
    const style = wrapper.find('.horse-icon').attributes('style') || '';
    expect(style.includes('231') && style.includes('76') && style.includes('60')).toBe(true);
  });

  it('uses default color when not provided', () => {
    const wrapper = mount(HorseIcon);
    const style = wrapper.find('.horse-icon').attributes('style') || '';
    expect(style.includes('#888') || style.includes('136, 136, 136')).toBe(true);
  });

  it('has aria-hidden for decorative icon', () => {
    const wrapper = mount(HorseIcon);
    expect(wrapper.find('.horse-icon').attributes('aria-hidden')).toBe('true');
  });
});
