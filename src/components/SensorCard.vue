<script setup>
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

defineProps({
  sensor: {
    type: String,
    required: true,
  },
  sensor_id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

// Функция для получения названия датчика
const getSensorName = (sensor) => {
  const names = {
    temperature: 'Температура',
    oxygen_level: 'Кислород',
    ph_level: 'Кислотность',
    orp_level: 'ORP',
    salinity: 'Соленость',
    water_level: 'Уровень воды',
    turbidity: 'Мутность',
    amonia_content: 'Аммиак',
    netrite_content: 'Нитриты',
  };
  return names[sensor] || sensor;
};

// Функция для форматирования значения
const getFormattedValue = (sensor, value) => {
  const formats = {
    temperature: `${value.toFixed(1)} °C`,
    oxygen_level: `${value.toFixed(2)} мг/л`,
    ph_level: `${value.toFixed(2)} pH`,
    orp_level: `${value.toFixed(2)} мВ`,
    salinity: `${value.toFixed(2)} мг/л`,
    water_level: `${value.toFixed(2)} м`,
    turbidity: `${value.toFixed(2)} NTU`,
    amonia_content: `${value.toFixed(2)} мг/л`,
    netrite_content: `${value.toFixed(2)} мг/л`,
  };
  return formats[sensor] || value.toFixed(2);
};
</script>

<template>
  <Card class="w-[270px]">
    <div class="info_layout p-4 space-y-0">
      <!-- Название датчика и его значение -->
      <div class="w-[236px] flex flex-row place-content-between">
        <div class="primary">{{ getSensorName(sensor) }}</div>
        <div class="secondary">{{ getFormattedValue(sensor, value) }}</div>
      </div>

      <!-- Кнопка "Настроить" -->
      <Button type="submit" class="w-full">
        <img src="/src/assets/icons/cog.svg" alt="Настройки" /> Настроить
      </Button>
    </div>
  </Card>
</template>

<style scoped>
.info_layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.primary {
  color: #0f172a;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.1px;
}
.secondary {
  overflow: hidden;
  color: #0f172a;
  text-overflow: ellipsis;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
}
</style>
