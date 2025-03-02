import { defineStore } from 'pinia';
import apiClient from '@/services/authService';

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

        // Проверяем, что ответ содержит поле data_type
        if (response.data.data_type) {
          // Заменяем одинарные кавычки на двойные и парсим JSON
          const poolsDataString = response.data.data_type.replace(/'/g, '"');
          const poolsData = JSON.parse(poolsDataString);

          // Обновляем состояние pools
          this.pools = poolsData.map((pool) => ({
            pool_id: pool.pool_id,
            pool_name: pool.pool_name,
            pool_desc: pool.pool_desc,
          }));
        } else {
          console.error('Поле data_type отсутствует в ответе сервера');
        }
      } catch (error) {
        console.error('Ошибка при получении данных о бассейнах:', error);
      }
    },
  },
});
