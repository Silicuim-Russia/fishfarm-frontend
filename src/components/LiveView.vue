<script setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import LivePlayer from './LivePlayer.vue';

const isStreaming = ref(false);
const toggleStream = () => {
  isStreaming.value = !isStreaming.value;
};
</script>

<template>
  <div class="live__container">
    <div class="screen">
      <div v-if="isStreaming" class="stream__container">
        <LivePlayer />
        <Button variant="outline" class="stop-button" @click="toggleStream">
          <img src="/src/assets/icons/stop.svg" alt="" />
        </Button>
      </div>
      <div v-else class="stream__container">
        <img
          src="/src/assets/tempview.png"
          alt="Temp View"
          class="background-image"
        />
        <div class="overlay">
          <Button variant="destructive" @click="toggleStream">
            Активировать трансляцию
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live__container {
  display: flex;
  height: 18.75rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.625rem;
  align-self: stretch;
}
.screen {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 6px;
  overflow: hidden;
}
.stream__container {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
.stop-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
}
</style>
