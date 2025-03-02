import { defineStore } from 'pinia';
import apiClient from '@/services/authService';

export const usePoolsDataStore = defineStore('pools', {
  state: () => ({
    pools: [],
  }),
  getters: {},
  actions: {
    async fetchAllDataPool(pool_id) {
      try {
        const response = await apiClient.get('status/', {
          params: { pool_id },
        });
        this.pools = response.data.status.map((pool) => ({
          pool_id: pool.pool_id,
          timestamp: pool.pool_name,
          pool_desc: pool.pool_desc,
          temperature: {
            sensor: pool.temperature.sensor,
            minValue: pool.temperature.min_value,
            maxValue: pool.temperature.max_value,
            value: pool.temperature.value,
          },
          oxygen_saturation: {
            sensor: pool.oxygen_saturation.sensor,
            minValue: pool.oxygen_saturation.min_value,
            maxValue: pool.oxygen_saturation.max_value,
            value: pool.oxygen_saturation.value,
          },
          ph: {
            sensor: pool.ph.sensor,
            minValue: pool.ph.min_value,
            maxValue: pool.ph.max_value,
            value: pool.ph.value,
          },
          orp: {
            sensor: pool.orp.sensor,
            minValue: pool.orp.min_value,
            maxValue: pool.orp.max_value,
            value: pool.orp.value,
          },
          salinity: {
            sensor: pool.salinity.sensor,
            minValue: pool.salinity.min_value,
            maxValue: pool.salinity.max_value,
            value: pool.salinity.value,
          },
          water_level: {
            sensor: pool.water_level.sensor,
            minValue: pool.water_level.min_value,
            maxValue: pool.water_level.max_value,
            value: pool.water_level.value,
          },
          turbidity: {
            sensor: pool.turbidity.sensor,
            minValue: pool.turbidity.min_value,
            maxValue: pool.turbidity.max_value,
            value: pool.turbidity.value,
          },
          amonia_content: {
            sensor: pool.amonia_content.sensor,
            minValue: pool.amonia_content.min_value,
            maxValue: pool.amonia_content.max_value,
            value: pool.amonia_content.value,
          },
          nitrite_content: {
            sensor: pool.nitrite_content.sensor,
            minValue: pool.nitrite_content.min_value,
            maxValue: pool.nitrite_content.max_value,
            value: pool.nitrite_content.value,
          },
        }));
      } catch (error) {
        console.error('Ошибка при получении данных бассейнов:', error);
      }
    },
  },
});
