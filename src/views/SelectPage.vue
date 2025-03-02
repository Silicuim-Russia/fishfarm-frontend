<script setup>
import SelectCard from '@/components/SelectCard.vue';
import { usePoolsStore } from '../../stores/poolsStore';

const poolsStore = usePoolsStore();
</script>

<template>
  <div class="select__container">
    <span class="title">Здравствуйте! Выберите бассейн:</span>
    <div class="pools_container">
      <SelectCard
        v-for="pool in poolsStore.allPools"
        :pool_id="pool.pool_id"
        :pool_name="pool.pool_name"
        :pool_desc="pool.pool_desc"
      />
    </div>
  </div>
</template>

<style scoped>
.select__container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.pools_container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}
.title {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}
</style>
