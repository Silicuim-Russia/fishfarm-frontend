<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderMenu from '@/components/HeaderMenu.vue';
import LiveView from '@/components/LiveView.vue';
import SensorCard from '@/components/SensorCard.vue';
import SettingsTab from '@/components/SettingsTab.vue';

import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import { usePoolsDataStore } from '../../stores/poolsDataStore';

const route = useRoute();
const pool_id = route.params.id;
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

const sensorsList = computed(() => poolsDataStore.getSensorsList);
</script>

<template>
  <div class="home_page__container">
    <HeaderMenu :pool_id_active="pool_id" />
    <LiveView />

    <!-- Вкладки -->
    <Tabs defaultValue="sensors">
      <div class="tabs__list-container">
        <TabsList>
          <TabsTrigger value="sensors">Датчики</TabsTrigger>
          <TabsTrigger value="settings">Общие настройки</TabsTrigger>
        </TabsList>
      </div>

      <!-- Содержимое вкладки "Датчики" -->
      <TabsContent value="sensors">
        <div class="sensors__container">
          <SensorCard
            v-for="sensor in sensorsList"
            :pool_id="pool_id"
            :sensor_id="sensor.sensor_id"
            :sensor="sensor.sensor_name"
            :value="sensor.value"
            :maxValue="sensor.maxValue"
            :minValue="sensor.minValue"
            :zone="sensor.zone"
          />
        </div>
      </TabsContent>

      <!-- Содержимое вкладки "settings" -->
      <TabsContent value="settings">
        <SettingsTab :pool_id="pool_id" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped>
.home_page__container {
  padding-left: 20px;
  padding-right: 20px;
}
.tabs__list-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  margin-bottom: 24px;
  margin-top: 24px;
}
.sensors__container {
  gap: 15px;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
}
.title {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}
.pool_settings {
  width: 100%;
  max-width: 404px;
  margin: 0 auto;
}
.settings__container {
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  margin-top: 16px;
}
</style>
