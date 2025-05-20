<script setup>
defineProps({
  health_zone: String,
});

const getFormattedZone = (health_zone) => {
  const formats = {
    good: `Хорошо`,
    warning: `Внимание`,
    danger: `Опасно`,
  };
  return formats[health_zone] || 'Unknown';
};
</script>

<template>
  <span class="badge small" :class="`badge--${health_zone}`">
    {{ getFormattedZone(health_zone) }}
  </span>
</template>

<style scoped>
.badge {
  display: flex;
  padding: 0.1875rem 0.375rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.375rem;
}
.small {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.875rem;
}
.badge--good {
  background-color: #34c759;
}
.badge--warning {
  background-color: #ff9500;
}
.badge--danger {
  background-color: #ff3b30;
}
</style>
