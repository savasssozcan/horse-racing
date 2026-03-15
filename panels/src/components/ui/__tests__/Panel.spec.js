import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Panel from '../Panel.vue';

vi.mock('overlayscrollbars-vue', () => ({
  OverlayScrollbarsComponent: {
    name: 'OverlayScrollbarsComponent',
    template: '<div class="mock-scroll"><slot /></div>',
  },
}));

describe('Panel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title when provided', () => {
    const wrapper = mount(Panel, {
      props: { title: 'Test Panel' },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('.panel__title').text()).toBe('Test Panel');
  });

  it('does not render title when empty', () => {
    const wrapper = mount(Panel, {
      props: { title: '' },
      slots: { default: '<p>Content</p>' },
    });
    expect(wrapper.find('.panel__title').exists()).toBe(false);
  });

  it('renders default slot content inside scroll area', () => {
    const wrapper = mount(Panel, {
      slots: { default: '<p class="slot-content">Hello</p>' },
    });
    expect(wrapper.find('.slot-content').text()).toBe('Hello');
  });

  it('renders empty text when no slot and emptyText provided', () => {
    const wrapper = mount(Panel, {
      props: { emptyText: 'No data' },
    });
    expect(wrapper.find('.panel__empty').text()).toBe('No data');
  });

  it('applies program variant class', () => {
    const wrapper = mount(Panel, {
      props: { variant: 'program' },
      slots: { default: '<p>x</p>' },
    });
    expect(wrapper.find('.panel--program').exists()).toBe(true);
  });

  it('applies results variant class', () => {
    const wrapper = mount(Panel, {
      props: { variant: 'results' },
      slots: { default: '<p>x</p>' },
    });
    expect(wrapper.find('.panel--results').exists()).toBe(true);
  });
});
