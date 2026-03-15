import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Header from '../Header.vue';

function createMockStore(overrides = {}) {
  const generateProgram = vi.fn();
  const resetAll = vi.fn();
  const setRacing = vi.fn();
  const setPaused = vi.fn();
  const store = createStore({
    modules: {
      program: {
        namespaced: true,
        getters: {
          canGenerate: () => overrides.canGenerate ?? true,
          canReset: () => overrides.canReset ?? false,
        },
        actions: { generate: generateProgram, reset: resetAll },
      },
      race: {
        namespaced: true,
        getters: {
          canStart: () => overrides.canStart ?? true,
          isRacing: () => overrides.isRacing ?? false,
          isPaused: () => overrides.isPaused ?? false,
        },
        actions: { setRacing, setPaused },
      },
    },
  });
  store._actionMocks = { generateProgram, resetAll, setRacing, setPaused };
  return store;
}

describe('Header', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
  });

  it('renders all three buttons', () => {
    store = createMockStore({ canReset: true });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-generate').text()).toBe('GENERATE PROGRAM');
    expect(wrapper.find('.btn-start').text()).toBe('START');
    expect(wrapper.find('.btn-reset').text()).toBe('RESET');
  });

  it('disables generate button when canGenerate is false', async () => {
    store = createMockStore({ canGenerate: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-generate').attributes('disabled')).toBeDefined();
  });

  it('calls program generate when GENERATE PROGRAM is clicked', async () => {
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    await wrapper.find('.btn-generate').trigger('click');
    expect(store._actionMocks.generateProgram).toHaveBeenCalled();
  });

  it('shows START when not racing', () => {
    store = createMockStore({ isRacing: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-start').text()).toBe('START');
  });

  it('shows PAUSE when racing and not paused', () => {
    store = createMockStore({ isRacing: true, isPaused: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-start').text()).toBe('PAUSE');
  });

  it('shows CONTINUE when racing but paused (resume)', () => {
    store = createMockStore({ isRacing: true, isPaused: true });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-start').text()).toBe('CONTINUE');
  });

  it('emits start-race when START is clicked and not racing', async () => {
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    await wrapper.find('.btn-start').trigger('click');
    expect(wrapper.emitted('start-race')).toHaveLength(1);
    expect(store._actionMocks.setRacing).toHaveBeenCalledWith(expect.anything(), true);
    expect(store._actionMocks.setPaused).toHaveBeenCalledWith(expect.anything(), false);
  });

  it('calls setPaused(true) when PAUSE is clicked', async () => {
    store = createMockStore({ isRacing: true, isPaused: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    await wrapper.find('.btn-start').trigger('click');
    expect(store._actionMocks.setPaused).toHaveBeenCalledWith(expect.anything(), true);
  });

  it('start button is disabled when canStart is false and not racing', () => {
    store = createMockStore({ canStart: false, isRacing: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-start').attributes('disabled')).toBeDefined();
  });

  it('disables reset button when canReset is false', () => {
    store = createMockStore({ canReset: false });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    expect(wrapper.find('.btn-reset').attributes('disabled')).toBeDefined();
  });

  it('calls program reset when RESET is clicked', async () => {
    store = createMockStore({ canReset: true });
    const wrapper = mount(Header, {
      global: { plugins: [store] },
    });
    await wrapper.find('.btn-reset').trigger('click');
    expect(store._actionMocks.resetAll).toHaveBeenCalled();
  });
});
