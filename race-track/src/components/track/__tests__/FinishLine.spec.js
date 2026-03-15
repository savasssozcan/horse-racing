import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FinishLine from '../FinishLine.vue';

describe('FinishLine', () => {
  it('renders finish line with FINISH label', () => {
    const wrapper = mount(FinishLine);
    expect(wrapper.find('.finish-line').exists()).toBe(true);
    expect(wrapper.find('.finish-line__label').text()).toBe('FINISH');
  });

  it('has aria-label for accessibility', () => {
    const wrapper = mount(FinishLine);
    expect(wrapper.find('.finish-line').attributes('aria-label')).toBe('Finish line');
  });
});
