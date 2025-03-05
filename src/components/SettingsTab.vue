<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/toast/use-toast';
import { usePoolsStore } from '../../stores/poolsStore';
import { ref, watch } from 'vue';
import apiClient from '@/services/authService';

const poolsStore = usePoolsStore();
const { toast } = useToast();
const props = defineProps({
  pool_id: [String, Number],
});

const poolData = poolsStore.getPoolById(Number(props.pool_id));
const pool_name = ref(poolData?.pool_name || '');
const pool_desc = ref(poolData?.pool_desc || '');

watch(
  () => poolsStore.getPoolById(Number(props.pool_id)),
  (newPoolData) => {
    if (newPoolData) {
      pool_name.value = newPoolData.pool_name || '';
      pool_desc.value = newPoolData.pool_desc || '';
    }
  },
  { immediate: true }
);

const isAlertDialogOpen = ref(false);
const saveSettings = async () => {
  try {
    const response = await apiClient.post('setting/', {
      pool_id: props.pool_id,
      pool_name: pool_name.value,
      pool_desc: pool_desc.value,
    });

    if (response.data.is_updated) {
      poolsStore.fetchAllPools();
      toast({
        title: 'Успешно',
        description: 'Отображаемая информация обновлена.',
        variant: 'default',
      });
    }
  } catch (error) {
    console.log(error);
    toast({
      title: 'Ошибка в данных',
      description: 'Пожалуйста, заполните поля верно.',
      variant: 'destructive',
    });
  } finally {
    isAlertDialogOpen.value = false;
  }
};

const handleDeleteClick = () => {
  toast({
    title: 'Функция в разработке',
    description: 'Удаление бассейна пока не доступно.',
    variant: 'destructive',
  });
};
</script>

<template>
  <Card class="settings__container p-4">
    <CardTitle class="title mb-2">Отображаемая информация</CardTitle>
    <CardDescription
      >Используйте краткие названия и описания для удобства работы
    </CardDescription>
    <CardContent class="content__container">
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

        <!-- Поле для Описание бассейна -->
        <div class="flex flex-col space-y-1.5">
          <Label for="pool_desc">Описание бассейна</Label>
          <Input
            id="pool_desc"
            type="text"
            placeholder="Расположен в Секторе 5, ряд 4"
            v-model="pool_desc"
          />
        </div>

        <!-- Кнопка "Сохранить" с диалоговым окном -->
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button type="button">
              <img src="/src/assets/icons/check-check.svg" />Сохранить
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Подтвердите изменения</AlertDialogTitle>
              <AlertDialogDescription>
                Будет обновлена отображаемая информация бассейна
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction @click="saveSettings"
                >Подтвердить</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </CardContent>
  </Card>
  <Card class="settings__container p-4">
    <CardTitle class="title mb-2">Удалить бассейн</CardTitle>
    <CardDescription>
      Обратите внимание, что это действие необратимо, поэтому действуйте с
      осторожностью
    </CardDescription>
    <CardContent class="content__container mt-4">
      <Button variant="destructive" @click="handleDeleteClick"
        ><img src="/src/assets/icons/alert-circle.svg" />Удалить</Button
      >
    </CardContent>
  </Card>
</template>

<style scoped>
.settings__container {
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  margin-top: 16px;
}
.content__container {
  padding: 0;
}
</style>
