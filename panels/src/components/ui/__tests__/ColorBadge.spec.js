import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ColorBadge from '../ColorBadge.vue';

describe('ColorBadge', () => {
  it('renders dot with correct background color for known color', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: 'Red' },
    });
    const dot = wrapper.find('.color-badge__dot');
    const style = dot.attributes('style') || '';
    expect(style.includes('231') && style.includes('76') && style.includes('60')).toBe(true);
  });

  it('renders label by default', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: 'Blue' },
    });
    expect(wrapper.find('.color-badge__label').text()).toBe('Blue');
  });

  it('hides label when showLabel is false', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: 'Green', showLabel: false },
    });
    expect(wrapper.find('.color-badge__label').exists()).toBe(false);
  });

  it('shows fallback label when colorName is empty', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: '' },
    });
    expect(wrapper.find('.color-badge__label').text()).toBe('—');
  });

  it('has aria-label on dot', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: 'Red' },
    });
    expect(wrapper.find('.color-badge__dot').attributes('aria-label')).toBe('Red');
  });

  it('uses fallback hex for unknown color name', () => {
    const wrapper = mount(ColorBadge, {
      props: { colorName: 'UnknownColor' },
    });
    const dot = wrapper.find('.color-badge__dot');
    const style = dot.attributes('style') || '';
    expect(style.includes('#888') || style.includes('136, 136, 136')).toBe(true);
  });
});
