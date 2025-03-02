import { defineStore } from 'pinia';
import apiClient from '@/services/authService';

export const usePoolsDataStore = defineStore('poolsData', {
  state: () => ({
    pool: null,
  }),
  getters: {
    getPoolData: (state) => state.pool,
    getSensorsList: (state) => {
      if (!state.pool || !state.pool.sensors) {
        return [];
      }

      return Object.entries(state.pool.sensors).map(
        ([sensorName, sensorData]) => ({
          sensor_id: sensorData.sensor_id,
          sensor_name: sensorName,
          value: sensorData.value,
          minValue: sensorData.minValue,
          maxValue: sensorData.maxValue,
          zone: sensorData.zone,
        })
      );
    },
  },
  actions: {
    async fetchPoolData(pool_id) {
      try {
        console.log('Запрос к API с pool_id:', pool_id);
        const response = await apiClient.get('status/', {
          params: { pool_id },
        });

        console.log('Ответ сервера:', response.data);
        if (!response.data) {
          console.error('Нет данных о бассейне');
          return;
        }

        this.pool = {
          pool_id: response.data.pool_id,
          timestamp: response.data.timestamp,
          sensors: {
            temperature: {
              sensor_id: response.data.temperature.sensor_id,
              minValue: response.data.temperature.min_value,
              maxValue: response.data.temperature.max_value,
              value: response.data.temperature.value,
              zone: response.data.temperature.zone,
            },
            oxygen_saturation: {
              sensor_id: response.data.oxygen_saturation.sensor_id,
              minValue: response.data.oxygen_saturation.min_value,
              maxValue: response.data.oxygen_saturation.max_value,
              value: response.data.oxygen_saturation.value,
              zone: response.data.oxygen_saturation.zone,
            },
            pH: {
              sensor_id: response.data.pH.sensor_id,
              minValue: response.data.pH.min_value,
              maxValue: response.data.pH.max_value,
              value: response.data.pH.value,
              zone: response.data.pH.zone,
            },
            orp: {
              sensor_id: response.data.orp.sensor_id,
              minValue: response.data.orp.min_value,
              maxValue: response.data.orp.max_value,
              value: response.data.orp.value,
              zone: response.data.orp.zone,
            },
            salinity: {
              sensor_id: response.data.salinity.sensor_id,
              minValue: response.data.salinity.min_value,
              maxValue: response.data.salinity.max_value,
              value: response.data.salinity.value,
              zone: response.data.salinity.zone,
            },
            water_level: {
              sensor_id: response.data.water_level.sensor_id,
              minValue: response.data.water_level.min_value,
              maxValue: response.data.water_level.max_value,
              value: response.data.water_level.value,
              zone: response.data.water_level.zone,
            },
            turbidity: {
              sensor_id: response.data.turbidity.sensor_id,
              minValue: response.data.turbidity.min_value,
              maxValue: response.data.turbidity.max_value,
              value: response.data.turbidity.value,
              zone: response.data.turbidity.zone,
            },
            ammonia_content: {
              sensor_id: response.data.ammonia_content.sensor_id,
              minValue: response.data.ammonia_content.min_value,
              maxValue: response.data.ammonia_content.max_value,
              value: response.data.ammonia_content.value,
              zone: response.data.ammonia_content.zone,
            },
            nitrite_content: {
              sensor_id: response.data.nitrite_content.sensor_id,
              minValue: response.data.nitrite_content.min_value,
              maxValue: response.data.nitrite_content.max_value,
              value: response.data.nitrite_content.value,
              zone: response.data.nitrite_content.zone,
            },
          },
        };
      } catch (error) {
        console.error('Ошибка при получении данных бассейна:', error);
      }
    },
  },
});
