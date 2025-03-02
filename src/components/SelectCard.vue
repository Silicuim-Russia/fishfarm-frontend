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
        <!-- <img src="/src/assets/icons/ellipse.svg" /> -->
        <div class="info_layout">
          <span class="title">{{ pool_name }}</span>
          <span class="secondary">{{ pool_desc }}</span>
        </div>
      </div>
    </Card>
  </router-link>
</template>

<style scoped>
.pool_card {
  display: flex;
  width: 188px;
  height: 188px;
  padding: 48px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.select_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
}
.info_layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.title {
  display: -webkit-box;
  width: 140px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}
.secondary {
  display: -webkit-box;
  width: 140px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #64748b;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.084px;
}
</style>
