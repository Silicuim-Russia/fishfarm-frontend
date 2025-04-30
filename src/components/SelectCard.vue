<script setup>
import Card from '@/components/ui/card/Card.vue';
import Button from '@/components/ui/button/Button.vue';
import StateBadge from './StateBadge.vue';

defineProps({
  pool_id: [String, Number],
  pool_name: String,
  pool_desc: String,
  health_percents: Number,
  health_zone: String,
  last_update: String,
});

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toTimeString().slice(0, 8); // "07:48:10"
}
</script>

<template>
  <router-link :to="{ name: 'HomePage', params: { id: pool_id } }">
    <Card class="pool_card">
      <div class="info_layout">
        <span class="title">{{ pool_name }}</span>
        <span class="muted">{{ pool_desc }}</span>
      </div>

      <div class="stats__container">
        <span class="muted">Состояние</span>
        <div class="state__container">
          <span class="medium">{{ health_percents }}%</span>
          <img src="/src/assets/icons/dot.svg" alt="" />
          <StateBadge :health_zone="health_zone" />
        </div>
      </div>

      <div class="two_columns__container">
        <div class="stats__container">
          <span class="muted">Обновлено</span>
          <span class="medium">{{ formatTime(last_update) }}</span>
        </div>

        <div class="stats__container">
          <span class="muted">ID</span>
          <span class="medium">1</span>
        </div>
      </div>

      <Button class="more_button">
        <img src="/src/assets/icons/history.svg" alt="Подробнее" />
        Подробнее
      </Button>
    </Card>
  </router-link>
</template>

<style scoped>
.pool_card {
  display: flex;
  width: 11.75rem;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
}
.info_layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.stats__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.state__container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.two_columns__container {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}
.more_button {
  width: 100%;
}
.title {
  color: #18181b;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}
.medium {
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #18181b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
}
.muted {
  color: #64748b;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.875rem;
}
</style>
