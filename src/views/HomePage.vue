<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeaderMenu from '@/components/HeaderMenu.vue';
import LiveView from '@/components/LiveView.vue';
import SensorCard from '@/components/SensorCard.vue';

const sensors = [
  { sensor_id: '123', sensor_name: 'temperature', value: 37.3 },
  { sensor_id: '134', sensor_name: 'salinity', value: 11 },
  { sensor_id: '167', sensor_name: 'salinity', value: 11 },
];

const scenarios = [
  {
    scenario_id: 1,
    scenario_name: 'Сценарий 1',
    description: 'Описание сценария 1',
  },
  {
    scenario_id: 2,
    scenario_name: 'Сценарий 2',
    description: 'Описание сценария 2',
  },
];
</script>

<template>
  <HeaderMenu />
  <LiveView />

  <!-- Вкладки -->
  <Tabs defaultValue="sensors">
    <div class="tabs__list-container">
      <TabsList>
        <TabsTrigger value="sensors">Датчики</TabsTrigger>
        <TabsTrigger value="scenarios">Сценарии</TabsTrigger>
      </TabsList>
    </div>

    <!-- Содержимое вкладки "Датчики" -->
    <TabsContent value="sensors">
      <div class="sensors__container">
        <SensorCard
          v-for="sensor in sensors"
          :sensor_id="sensor.sensor_id"
          :sensor="sensor.sensor_name"
          :value="sensor.value"
        />
      </div>
    </TabsContent>

    <!-- Содержимое вкладки "Сценарии" -->
    <TabsContent value="scenarios">
      <div class="scenarios__container">
        <div
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario__item p-4 border rounded-md mb-4"
        >
          <h3 class="text-lg font-medium">{{ scenario.scenario_name }}</h3>
          <p class="text-sm text-muted-foreground">
            {{ scenario.description }}
          </p>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>

<style scoped>
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
.scenarios__container {
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
}
.scenario__item {
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
