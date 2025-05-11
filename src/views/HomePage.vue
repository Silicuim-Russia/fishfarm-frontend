<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveView from '@/components/LiveView.vue';
import PoolInfo from '@/components/PoolInfo.vue';
import SensorCard from '@/components/SensorCard.vue';
import SettingsTab from '@/components/SettingsTab.vue';

import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { usePoolsStore } from '../../stores/poolsStore';
import { usePoolsDataStore } from '../../stores/poolsDataStore';

const route = useRoute();
const pool_id = route.params.id;
const poolStore = usePoolsStore();
const poolsDataStore = usePoolsDataStore();

onMounted(async () => {
  try {
    if (!pool_id) {
      console.error('ID бассейна не передан');
      return;
    }

    await poolsDataStore.fetchPoolData(pool_id);
  } catch (error) {
    console.error('Ошибка при загрузке данных бассейна:', error);
  }
});

const poolInfo = computed(() => poolStore.getPoolById(Number(pool_id)));
const sensorsList = computed(() => poolsDataStore.getSensorsList);
</script>

<template>
  <div class="sensor-data__container">
    <div class="general-info__container">
      <LiveView />
      <PoolInfo
        :name="poolInfo.pool_name"
        updateTime="12:30:15"
        :id="poolInfo.pool_id"
      />
    </div>

    <!-- Вкладки -->
    <Tabs defaultValue="sensors" class="tabs-content__container">
      <TabsList>
        <TabsTrigger value="sensors">Датчики</TabsTrigger>
        <TabsTrigger value="settings">Общие настройки</TabsTrigger>
      </TabsList>

      <!-- Содержимое вкладки "Датчики" -->
      <TabsContent value="sensors" class="tabs-content--sensors">
        <SensorCard
          v-for="sensor in sensorsList"
          :pool_id="pool_id"
          :sensor="sensor.sensor_name"
          :value="sensor.value"
          :maxValue="sensor.maxValue"
          :minValue="sensor.minValue"
          :zone="sensor.zone"
          class="sensor-card"
        />
      </TabsContent>

      <!-- Содержимое вкладки "settings" -->
      <TabsContent value="settings" class="tabs-content--settings">
        <SettingsTab :pool_id="pool_id" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>
.sensor-data__container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.general-info__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex-shrink: 0;

  width: auto;
  max-width: 25rem;
  min-width: 20rem;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: unset;
  }
}

.tabs-content__container {
  display: block;
  height: auto;
  flex: 1 0 0;
}

.tabs-content--sensors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  gap: 0.5rem;
}
.tabs-content--settings {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0rem;
}
</style>
