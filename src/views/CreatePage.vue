<script setup>
import { Card, CardTitle, CardDescription } from '@/components/ui/card/';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
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
      <form class="create__form">
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
.medium {
  color: #18181b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}
</style>
