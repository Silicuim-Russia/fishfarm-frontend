import { defineStore } from 'pinia';

export const usePoolsStore = defineStore('pools', {
  state: () => ({
    pools: [],
  }),
  getters: {
    pool_id: (state) => state.pools?.pool_id,
    pool_name: (state) => state.pools?.pool_name,
    pool_desc: (state) => state.pools?.pool_desc,
  },
  actions: {
    async fetchAllPools() {
      try {
        const response = await apiClient.get('all-pools/', {});
        this.pools = response.data.all_pools.map((pool) => ({
          pool_id: pool.pool_id,
          pool_name: pool.pool_name,
          pool_desc: pool.pool_desc,
        }));
      } catch (error) {
        console.error('Ошибка при получении данных о бассейнах:', error);
      }
    },
  },
});
