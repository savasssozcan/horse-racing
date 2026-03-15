import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '../DataTable.vue';

describe('DataTable', () => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score', formatter: (val) => `#${val}` },
  ];

  it('renders table with headers', () => {
    const wrapper = mount(DataTable, {
      props: { columns, data: [] },
    });
    const headers = wrapper.findAll('.data-table__th');
    expect(headers).toHaveLength(3);
    expect(headers.map((h) => h.text())).toEqual(['ID', 'Name', 'Score']);
  });

  it('renders data rows', () => {
    const data = [
      { id: 1, name: 'A', score: 10 },
      { id: 2, name: 'B', score: 20 },
    ];
    const wrapper = mount(DataTable, {
      props: { columns, data },
    });
    const rows = wrapper.findAll('.data-table__row');
    expect(rows).toHaveLength(2);
    const cells = wrapper.findAll('.data-table__td');
    expect(cells[0].text()).toBe('1');
    expect(cells[1].text()).toBe('A');
    expect(cells[2].text()).toBe('#10');
    expect(cells[3].text()).toBe('2');
    expect(cells[4].text()).toBe('B');
    expect(cells[5].text()).toBe('#20');
  });

  it('uses rowKey function when provided', () => {
    const data = [{ name: 'X' }, { name: 'Y' }];
    const wrapper = mount(DataTable, {
      props: {
        columns: [{ key: 'name', label: 'Name' }],
        data,
        rowKey: (row, index) => `row-${index}-${row.name}`,
      },
    });
    const rows = wrapper.find('.data-table__body').findAll('tr');
    expect(rows).toHaveLength(2);
    expect(rows[0].find('td').text()).toBe('X');
    expect(rows[1].find('td').text()).toBe('Y');
  });

  it('applies compact class when compact is true', () => {
    const wrapper = mount(DataTable, {
      props: { columns, data: [], compact: true },
    });
    expect(wrapper.find('.data-table--compact').exists()).toBe(true);
  });

  it('renders when slot for column is provided', () => {
    const data = [{ id: 1, name: 'Test' }];
    const wrapper = mount(DataTable, {
      props: {
        columns: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }],
        data,
      },
      slots: {
        name: ({ value }) => value,
      },
    });
    const cells = wrapper.findAll('.data-table__td');
    expect(cells).toHaveLength(2);
    expect(cells[0].text()).toBe('1');
    expect(cells[1].text()).toBe('Test');
  });
});
