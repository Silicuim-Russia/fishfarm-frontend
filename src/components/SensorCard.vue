<script setup>
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ref, watch } from 'vue';

const props = defineProps({
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
  maxValue: {
    type: Number,
  },
  minValue: {
    type: Number,
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

// Состояние для минимального и максимального значения
const localMinValue = ref(null);
const localMaxValue = ref(null);

// Метод для сохранения настроек
const saveSettings = () => {
  console.log('Минимальное значение:', localMinValue.value);
  console.log('Максимальное значение:', localMaxValue.value);
};

// Отслеживаем открытие Drawer и инициализируем значения
const isDrawerOpen = ref(false);

watch(isDrawerOpen, (newVal) => {
  if (newVal) {
    // При открытии Drawer устанавливаем значения из props
    localMinValue.value = props.minValue ?? null;
    localMaxValue.value = props.maxValue ?? null;
  }
});

// Эмитим событие close при закрытии Drawer
const emit = defineEmits(['close']);
</script>

<template>
  <Card class="w-[270px]">
    <div class="info_layout p-4 space-y-0">
      <!-- Название датчика и его значение -->
      <div class="w-[236px] flex flex-row place-content-between">
        <div class="primary">{{ getSensorName(sensor) }}</div>
        <div class="secondary">{{ getFormattedValue(sensor, value) }}</div>
      </div>

      <!-- Кнопка "Настроить" с Drawer -->
      <Drawer v-model:open="isDrawerOpen">
        <DrawerTrigger asChild>
          <Button class="w-full">
            <img src="/src/assets/icons/cog.svg" alt="Настройки" /> Настроить
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div class="drawer_layout">
            <DrawerHeader>
              <DialogTitle
                >Настройки датчика "{{ getSensorName(sensor) }}" ID:
                {{ sensor_id }}</DialogTitle
              >
            </DrawerHeader>

            <!-- Содержимое настроек -->
            <div class="settings_container p-4">
              <!-- Текущее значение -->
              <div class="setting_item mb-4">
                <strong>Текущее значение:</strong>
                {{ getFormattedValue(sensor, value) }}
              </div>

              <!-- Минимальное допустимое значение -->
              <div class="setting_item mb-4">
                <Label for="min-value">Мин. допустимое значение</Label>
                <Input
                  id="min-value"
                  type="number"
                  placeholder="Введите минимум"
                  v-model="localMinValue"
                />
              </div>

              <!-- Максимальное допустимое значение -->
              <div class="setting_item mb-4">
                <Label for="max-value">Макс. допустимое значение</Label>
                <Input
                  id="max-value"
                  type="number"
                  placeholder="Введите максимум"
                  v-model="localMaxValue"
                />
              </div>
            </div>

            <!-- Футер с кнопками -->
            <DrawerFooter class="flex flex-col gap-4 p-4">
              <!-- Кнопка "Сохранить" -->
              <Button @click="saveSettings" class="w-full">Сохранить</Button>

              <!-- Кнопка "Закрыть" -->
              <Button
                variant="outline"
                @click="isDrawerOpen = false"
                class="w-full"
              >
                Закрыть
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </Card>
</template>

<style scoped>
.drawer_layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 412px;
  margin: 0 auto;
  background: #fff;
}
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

.settings_container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting_item {
  font-size: 14px;
  color: #333;
}
</style>
