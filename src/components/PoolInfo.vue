<script setup>
import { Card } from '@/components/ui/card';

defineProps({
  name: String,
  updateTime: String,
  id: Number,
});
</script>

<template>
  <Card class="pool_info__container">
    <div class="subinfo_text__container">
      <span class="muted">Название</span>
      <span class="medium">{{ name }}</span>
    </div>
    <div class="text_subinfo__layout">
      <div class="subinfo_text__container">
        <span class="muted">Обновлено</span>
        <span class="medium">{{ updateTime }}</span>
      </div>
      <div class="subinfo_text__container">
        <span class="muted">ID</span>
        <span class="medium">{{ id }}</span>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.pool_info__container {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.info_card__container {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.text_subinfo__layout {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.subinfo_text__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.muted {
  color: #64748b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem;
}
.medium {
  color: #18181b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}
</style>
