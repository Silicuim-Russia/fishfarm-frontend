import { defineStore } from 'pinia';
import apiClient from '@/services/authService';
import { timestamp } from '@vueuse/core';

export const usePoolsStore = defineStore('pools', {
  state: () => ({
    pools: [],
  }),
  getters: {
    allPools: (state) => state.pools,
    getPoolById: (state) => (pool_id) => {
      return state.pools.find((pool) => pool.pool_id === pool_id) || null;
    },
  },
  actions: {
    async fetchAllPools() {
      try {
        const response = await apiClient.get('all-pools/', {});

        if (response.data && Array.isArray(response.data.data_type)) {
          this.pools = response.data.data_type.map((pool) => ({
            pool_id: pool.pool_id,
            pool_name: pool.pool_name,
            pool_desc: pool.pool_desc,
            health_percents: pool.health_percents,
            health_zone: pool.health_zone,
            last_update: pool.timestamp,
          }));
        } else {
          console.error(
            'Поле data_type отсутствует или содержит некорректные данные'
          );
        }
      } catch (error) {
        console.error('Ошибка при получении данных о бассейнах:', error);
        throw error;
      }
    },
    resetPoolsData() {
      pools = [];
    },
  },
});
