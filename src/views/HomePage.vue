<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import HeaderMenu from '@/components/HeaderMenu.vue';
import LiveView from '@/components/LiveView.vue';
import SensorCard from '@/components/SensorCard.vue';

const sensors = [
  {
    sensor_id: '123',
    sensor_name: 'temperature',
    value: 37.3,
    minValue: 31.4,
    maxValue: 38,
  },
  {
    sensor_id: '134',
    sensor_name: 'salinity',
    value: 11,
    minValue: 10.4,
    maxValue: 12,
  },
  {
    sensor_id: '167',
    sensor_name: 'salinity',
    value: 11,
    minValue: 10,
    maxValue: 12,
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
        <TabsTrigger value="settings">Общие настройки</TabsTrigger>
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
          :maxValue="sensor.maxValue"
          :minValue="sensor.minValue"
        />
      </div>
    </TabsContent>

    <!-- Содержимое вкладки "Сценарии" -->
    <TabsContent value="settings">
      <Card class="settings__container p-4">
        <CardTitle class="title mb-2">Отображаемая информация</CardTitle>
        <CardDescription
          >Используйте краткие названия и описания для удобства работы
        </CardDescription>
        <CardContent class="content-container">
          <form class="space-y-4 mt-4" @submit.prevent="settings">
            <!-- Поле для ввода Название бассейна -->
            <div class="flex flex-col space-y-1.5">
              <Label for="pool_name">Название бассейна</Label>
              <Input
                id="pool_name"
                type="text"
                placeholder="Бассейн с Карпами"
                v-model="pool_name"
              />
            </div>

            <!-- Поле для Описание Бассейна -->
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Описание Бассейна</Label>
              <Input
                id="pool_desc"
                type="text"
                placeholder="Расположен в Секторе 5, ряд 4"
                v-model="pool_desc"
              />
            </div>

            <!-- Кнопка "Сохранить" внутри формы -->
            <Button type="submit" class=""
              ><img src="/src/assets/icons/check-check.svg" />Сохранить</Button
            >
          </form>
        </CardContent>
      </Card>
      <Card class="settings__container p-4">
        <CardTitle class="title mb-2">Удалить бассейн</CardTitle>
        <CardDescription>
          Обратите внимание, что это действие необратимо, поэтому действуйте с
          осторожностью
        </CardDescription>
        <CardContent class="content-container mt-4">
          <Button variant="destructive" @click="delete"
            ><img src="/src/assets/icons/alert-circle.svg" />Удалить</Button
          >
        </CardContent>
      </Card>
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
.settings__container {
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
}
.title {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}
.content-container {
  padding: 0;
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
