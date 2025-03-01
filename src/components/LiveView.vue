<script setup>
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="live__container">
    <div class="screen">
      <img
        src="/src/assets/tempview.png"
        alt="Temp View"
        class="background-image"
      />
      <div class="overlay">
        <Button variant="destructive">Активировать трансляцию</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live__container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  margin-bottom: 24px;
}
.screen {
  position: relative;
  width: 100%;
  max-width: 840px;
  height: 300px;
  border-radius: 6px;
  overflow: hidden;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 6px;
}
.overlay button {
  z-index: 1;
}
</style>
