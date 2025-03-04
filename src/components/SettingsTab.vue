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
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

const handleSaveClick = () => {
  toast({
    title: 'Функция в разработке',
    description: 'Сохранение данных пока не доступно.',
    variant: 'default',
  });
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

        <!-- Поле для Описание Бассейна -->
        <div class="flex flex-col space-y-1.5">
          <Label for="pool_desc">Описание Бассейна</Label>
          <Input
            id="pool_desc"
            type="text"
            placeholder="Расположен в Секторе 5, ряд 4"
            v-model="pool_desc"
          />
        </div>

        <!-- Кнопка "Сохранить" внутри формы -->
        <Button type="submit" @click="handleSaveClick"
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
