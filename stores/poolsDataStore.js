import { defineStore } from 'pinia';

export const useUserStore = defineStore('pools', {
  state: () => ({
    pools: [],
  }),
  getters: {
    pool_id: (state) => state.pools?.pool_id,
  },
  actions: {},
});
