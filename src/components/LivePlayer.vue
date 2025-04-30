<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Hls from 'hls.js';

const videoPlayer = ref(null);
const hlsUrl = 'http://127.0.0.1:8000/watch/1';
let hls = null;

onMounted(() => {
  const video = videoPlayer.value;

  if (!video) return;

  hls = new Hls({
    autoStartLoad: true,
    enableWorker: true,
    xhrSetup: function (xhr) {
      xhr.withCredentials = false;
    },
  });

  hls.loadSource(hlsUrl);
  hls.attachMedia(video);

  video.play().catch((err) => {
    console.warn('❌ Autoplay failed:', err);
  });
});

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy();
    hls = null;
  }
});
</script>

<template>
  <video ref="videoPlayer" class="video" autoplay playsinline muted></video>
</template>

<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
