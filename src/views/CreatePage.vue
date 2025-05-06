<script setup>
import { ref } from 'vue';
import { Card, CardTitle, CardDescription } from '@/components/ui/card/';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/authService';
import { useToast } from '@/components/ui/toast/use-toast';
import { usePoolsStore } from '../../stores/poolsStore';

const router = useRouter();
const { toast } = useToast();
const poolsStore = usePoolsStore();

const pool_name = ref('');
const pool_desc = ref('');
const pool_id = ref('');
const rtsp_url = ref('');

const createPool = async () => {
  try {
    const response = await apiClient.post('create/', {
      pool_name: pool_name.value,
      pool_desc: pool_desc.value,
      pool_id: pool_id.value,
      rtsp_url: rtsp_url.value,
    });

    if (response.data.is_created) {
      poolsStore.fetchAllPools();
      toast({
        title: 'Успешно',
        description: 'Бассейн создан.',
        variant: 'default',
      });
      router.push({ name: 'SelectPage' });
    } else {
      toast({
        title: 'Ошибка в данных',
        description: 'Пожалуйста, заполните поля верно.',
        variant: 'destructive',
      });
    }
  } catch (error) {
    console.log(error);
    toast({
      title: 'Ошибка в данных',
      description: 'Пожалуйста, заполните поля верно.',
      variant: 'destructive',
    });
  }
};

const backPage = () => {
  router.push({ name: 'SelectPage' });
};
</script>

<template>
  <Card class="create">
    <div class="create__header">
      <CardTitle class="title">Создание бассейна</CardTitle>
      <CardDescription
        >Используйте краткие названия и описания для удобства работы
      </CardDescription>
    </div>
    <div class="create__container">
      <form class="create__form" @submit.prevent="createPool">
        <span class="medium">Название бассейна</span>
        <Input
          class="input"
          id="pool_name"
          type="text"
          placeholder="Бассейн с Карпами"
          v-model="pool_name"
        />

        <span class="medium">Описание бассейна</span>
        <Input
          id="pool_desc"
          type="text"
          placeholder="Расположен в Секторе 5, ряд 4"
          v-model="pool_desc"
        />

        <span class="medium">ID бассейна</span>
        <Input id="pool_id" type="text" placeholder="1234" v-model="pool_id" />

        <span class="medium">RTSP трансляция</span>
        <Input
          id="rtsp_url"
          type="text"
          placeholder="rtsp://example:exapmle@example"
          v-model="rtsp_url"
        />
      </form>
    </div>
    <div class="create__buttons">
      <Button type="default" @click="createPool" class="button-save">
        <img src="/src/assets/icons/check-check.svg" />Cохранить
      </Button>
      <Button
        @click="backPage"
        type="outline"
        variant="outline"
        class="button-back"
      >
        Отмена<img src="/src/assets/icons/forward.svg" />
      </Button>
    </div>
  </Card>
</template>

<style scoped>
.create {
  display: flex;
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
.create__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
.create__container {
  width: 100%;
}
.create__form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
.create__buttons {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
}
.medium {
  color: #18181b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.button-save {
  width: 100%;
}
.button-back {
  width: 100%;
}
</style>
