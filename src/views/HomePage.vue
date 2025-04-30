<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderMenu from '@/components/HeaderMenu.vue';
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
  <HeaderMenu :pool_id_active="pool_id" />
  <div class="home_page__container">
    <div class="general_info__container">
      <LiveView />
      <PoolInfo
        :name="poolInfo.pool_name"
        updateTime="12:30:15"
        :id="poolInfo.pool_id"
      />
    </div>

    <div class="tab_list__container">
      <!-- Вкладки -->
      <Tabs defaultValue="sensors" class="tabs__container">
        <div>
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
  </div>
</template>

<style scoped>
.home_page__container {
  display: inline-flex;
  align-items: flex-start;
  align-content: flex-start;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
}
.general_info__container {
  display: flex;
  max-width: 25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.tab_list__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  flex: 1 0 0;
}
.tabs__container {
  width: 100%;
}
.sensors__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
@media (max-width: 768px) {
  .sensors__container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .sensors__container {
    grid-template-columns: 1fr;
  }
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
