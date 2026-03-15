import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestStore } from '../../../__tests__/helpers/store';
import HorseList from '../HorseList.vue';

vi.mock('overlayscrollbars-vue', () => ({
  OverlayScrollbarsComponent: {
    name: 'OverlayScrollbarsComponent',
    template: '<div class="mock-scroll"><slot /></div>',
  },
}));

describe('HorseList', () => {
  it('shows empty message when no horses', () => {
    const store = createTestStore();
    const wrapper = mount(HorseList, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.horse-list__empty').exists()).toBe(true);
    expect(wrapper.find('.horse-list__empty').text()).toContain('GENERATE PROGRAM');
  });

  it('renders DataTable when horses exist', () => {
    const horses = [
      { id: '1', name: 'Horse A', condition: 80, color: 'Red' },
      { id: '2', name: 'Horse B', condition: 60, color: 'Blue' },
    ];
    const store = createTestStore({
      horses: { list: horses },
    });
    const wrapper = mount(HorseList, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.horse-list__empty').exists()).toBe(false);
    expect(wrapper.find('.data-table').exists()).toBe(true);
    expect(wrapper.find('.panel__title').text()).toBe('Horse List');
  });

  it('passes correct columns to DataTable', () => {
    const horses = [{ id: '1', name: 'A', condition: 50, color: 'Green' }];
    const store = createTestStore({ horses: { list: horses } });
    const wrapper = mount(HorseList, {
      global: { plugins: [store] },
    });
    const table = wrapper.findComponent({ name: 'DataTable' });
    expect(table.props('columns')).toHaveLength(4);
    expect(table.props('columns').map((c) => c.key)).toEqual(['index', 'name', 'condition', 'color']);
    expect(table.props('data')).toEqual(horses);
    expect(table.props('rowKey')).toBe('id');
  });
});
