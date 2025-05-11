<script setup>
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast/use-toast';
import { ref, watch, nextTick } from 'vue';
import { usePoolsDataStore } from '../../stores/poolsDataStore';
import apiClient from '@/services/authService';

const poolsDataStore = usePoolsDataStore();
const { toast } = useToast();

const props = defineProps({
  pool_id: {
    type: String,
    required: true,
  },
  sensor: {
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
  zone: {
    type: String,
  },
});

const getSensorName = (sensor) => {
  const names = {
    temperature: 'Температура',
    oxygen_saturation: 'Кислород',
    pH: 'Кислотность',
    orp: 'ORP',
    salinity: 'Соленость',
    water_level: 'Уровень воды',
    turbidity: 'Мутность',
    ammonia_content: 'Аммиак',
    nitrite_content: 'Нитриты',
  };
  return names[sensor] || sensor;
};

const getFormattedValue = (sensor, value) => {
  const formats = {
    temperature: `${value.toFixed(1)} °C`,
    oxygen_saturation: `${value.toFixed(1)} мг/л`,
    pH: `${value.toFixed(1)} pH`,
    orp: `${value.toFixed(1)} мВ`,
    salinity: `${value.toFixed(1)} мг/л`,
    water_level: `${value.toFixed(1)} м`,
    turbidity: `${value.toFixed(1)} NTU`,
    ammonia_content: `${value.toFixed(1)} мг/л`,
    nitrite_content: `${value.toFixed(1)} мг/л`,
  };
  return formats[sensor] || value.toFixed(2);
};

const localMinValue = ref(null);
const localMaxValue = ref(null);

const saveSettings = async () => {
  try {
    const response = await apiClient.post('update/', {
      sensor: props.sensor,
      pool_id: props.pool_id,
      minValue: localMinValue.value,
      maxValue: localMaxValue.value,
    });

    if (response.data.is_updated) {
      poolsDataStore.resetPoolData;
      poolsDataStore.fetchPoolData(props.pool_id);
      toast({
        title: 'Параметры датчика обновленны',
        description: 'Значения были применены.',
      });
    } else {
      throw new Error(response.data.message || 'Неизвестная ошибка');
    }
  } catch (error) {
    console.error('Ошибка при обновлении настроек:', error);
    toast({
      title: 'Ошибка при обновлении настроек датчика',
      description: 'Проверьте введенные данные для изменения.',
      variant: 'destructive',
    });
    errorMessage.value = error.message || 'Произошла ошибка при сохранении.';
    console.log('error');
  } finally {
    isDrawerOpen.value = false;
  }
};

const isDrawerOpen = ref(false);
const focusTrap = ref(null);

watch(isDrawerOpen, (newVal) => {
  if (newVal) {
    localMinValue.value = props.minValue ?? null;
    localMaxValue.value = props.maxValue ?? null;
    nextTick(() => {
      focusTrap.value?.focus();
    });
  }
});
</script>

<template>
  <Card class="card_container">
    <div class="info_layout p-4 space-y-0">
      <!-- Основная информация -->
      <div class="sensor_info__container">
        <div class="w-[100%] flex justify-between items-center">
          <span class="medium">{{ getSensorName(sensor) }}</span>
          <span :class="'value_text'">
            {{ getFormattedValue(sensor, value) }}
          </span>
        </div>

        <div class="w-[100%] flex justify-between items-center4">
          <span class="muted">Норма</span>
          <span class="medium">
            {{ props.minValue.toFixed(1) }} – {{ props.maxValue.toFixed(1) }}
          </span>
        </div>
      </div>

      <!-- Кнопки "Подробнее" и "Настроить" -->
      <div class="button_container">
        <Button @click="openDetailsModal" class="more__button">
          <img src="/src/assets/icons/history.svg" alt="Подробнее" />
          Подробнее
        </Button>
        <Button @click="isDrawerOpen = true" class="settings__button">
          <img src="/src/assets/icons/cog.svg" alt="Настройки" />
        </Button>
      </div>
    </div>

    <!-- Drawer для настроек -->
    <Drawer v-model:open="isDrawerOpen">
      <DrawerContent>
        <div ref="focusTrap" tabindex="0" class="sr-only"></div>

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
  </Card>
</template>

<style scoped>
.card_container {
  width: 100%;
  min-width: 17.5rem;
  box-sizing: border-box;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.sensor_info__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
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
.button_container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
}
.more__button {
  width: 100%;
}
.settings__button {
  min-width: 3.563rem;
}
.primary {
  color: #0f172a;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.1px;
}
.medium {
  color: #18181b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}
.muted {
  color: #64748b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem;
}
.value_text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5rem; /* 120% */
  letter-spacing: 0.00938rem;
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
