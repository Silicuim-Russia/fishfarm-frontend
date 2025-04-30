<script setup>
import Button from '@/components/ui/button/Button.vue';
import SelectCard from '@/components/SelectCard.vue';
import { usePoolsStore } from '../../stores/poolsStore';
import { useRouter } from 'vue-router';

const poolsStore = usePoolsStore();
const router = useRouter();

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push({ name: 'LoginPage' });
};
</script>

<template>
  <div class="header__container">
    <Button variant="default" @click="logout">Выйти</Button>
    <Button variant="default" @click="">Настройки аккаунта</Button>
    <Button variant="default" @click="">Новый бассейн</Button>
    <Button variant="default" @click="">Обновить данные</Button>
  </div>

  <div class="select__container">
    <span class="title">Все бассейны</span>
    <div class="pools_container">
      <SelectCard
        v-for="pool in poolsStore.allPools"
        :pool_id="pool.pool_id"
        :pool_name="pool.pool_name"
        :pool_desc="pool.pool_desc"
        :health_percents="pool.health_percents"
        :health_zone="pool.health_zone"
        :last_update="pool.last_update"
      />
    </div>
  </div>
</template>

<style scoped>
.header__container {
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  gap: 0.625rem;
  flex-wrap: wrap;
  padding-left: 1rem;
  padding-right: 1rem;
}
.select__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.pools_container {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1.25rem;
  align-self: stretch;
  flex-wrap: wrap;
}
.title {
  color: #18181b;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}
</style>
