import { defineStore } from 'pinia';

export const useUserStore = defineStore('pools', {
  state: () => ({
    pools: [],
  }),
  getters: {
    pool_id: (state) => state.pools?.pool_id,
    pool_name: (state) => state.pools?.pool_name,
    pool_desc: (state) => state.pools?.pool_desc,
  },
  actions: {},
});
