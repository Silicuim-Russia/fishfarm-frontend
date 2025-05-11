<script setup>
import SelectCard from '@/components/SelectCard.vue';
import { usePoolsStore } from '../../stores/poolsStore';

const poolsStore = usePoolsStore();
</script>

<template>
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
.select__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
}
.pools_container {
  display: flex;
  align-items: center;
  align-content: center;
  gap: 1rem;
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
