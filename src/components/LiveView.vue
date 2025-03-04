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
        <LivePlayer class="stream" />
        <Button variant="outline" class="stop-button" @click="toggleStream">
          Отключить трансляцию
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
.stream__container {
  max-width: 840px;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}
.stream {
  max-width: 100%;
  object-fit: contain;
}
.background-image {
  max-width: 100%;
  object-fit: contain;
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
}
</style>
