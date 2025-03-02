<script setup>
import Card from '@/components/ui/card/Card.vue';
</script>

<template>
  <Card class="pool_card">
    <div class="select_info">
      <img src="/src/assets/icons/ellipse.svg" />
      <div class="info_layout">
        <span class="title">Бассейн №1</span>
        <span class="secondary">Сектор 1, ряд 1</span>
      </div>
    </div>
  </Card>
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
