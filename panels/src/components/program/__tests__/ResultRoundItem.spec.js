import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ResultRoundItem from '../ResultRoundItem.vue';

describe('ResultRoundItem', () => {
  const round = {
    roundIndex: 1,
    distance: 1200,
    positions: [
      { name: 'First Horse' },
      { name: 'Second Horse' },
      { name: 'Third Horse' },
    ],
  };

  it('renders round title with ordinal and distance', () => {
    const wrapper = mount(ResultRoundItem, {
      props: { round },
    });
    expect(wrapper.find('strong').text()).toBe('1ST Lap - 1200m');
  });

  it('renders DataTable with positions', () => {
    const wrapper = mount(ResultRoundItem, {
      props: { round },
    });
    const table = wrapper.findComponent({ name: 'DataTable' });
    expect(table.exists()).toBe(true);
    expect(table.props('data')).toEqual(round.positions);
    expect(table.props('compact')).toBe(true);
  });

  it('shows position column as 1-based index', () => {
    const wrapper = mount(ResultRoundItem, {
      props: { round },
    });
    const cells = wrapper.findAll('.data-table__td');
    expect(cells[0].text()).toBe('1');
    expect(cells[2].text()).toBe('2');
    expect(cells[4].text()).toBe('3');
  });

  it('shows horse names in table', () => {
    const wrapper = mount(ResultRoundItem, {
      props: { round },
    });
    const cells = wrapper.findAll('.data-table__td');
    expect(cells[1].text()).toBe('First Horse');
    expect(cells[3].text()).toBe('Second Horse');
    expect(cells[5].text()).toBe('Third Horse');
  });
});
