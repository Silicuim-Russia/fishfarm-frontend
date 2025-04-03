<script setup>
import Card from '@/components/ui/card/Card.vue';

defineProps({
  pool_id: [String, Number],
  pool_name: String,
  pool_desc: String,
});
</script>

<template>
  <router-link :to="{ name: 'HomePage', params: { id: pool_id } }">
    <Card class="pool_card">
      <div class="select_info">
        <div class="info_layout">
          <span class="title">{{ pool_name }}</span>
          <span class="secondary">{{ pool_desc }}</span>
        </div>
        <div class="pool_status"></div>
      </div>
    </Card>
  </router-link>
</template>

<style scoped>
.pool_card {
  display: flex;
  width: 188px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
}
.select_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  row-gap: 23px;
  align-self: stretch;
  flex-wrap: wrap;
}
.info_layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.title {
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}
.secondary {
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.084px;
}
.pool_status {
  width: 18px;
  height: 36px;
  border-radius: 8px;
  background: #2cc702;
}
</style>
