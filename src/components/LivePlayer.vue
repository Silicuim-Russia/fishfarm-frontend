<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Hls from 'hls.js';

const videoPlayer = ref(null);

const hlsUrl = 'https://stream.noobweer.ru/hls/output.m3u8';

onMounted(() => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(hlsUrl);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoPlayer.value.play();
    });
  } else if (videoPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoPlayer.value.src = hlsUrl;
    videoPlayer.value.addEventListener('loadedmetadata', () => {
      videoPlayer.value.play();
    });
  }
});

onBeforeUnmount(() => {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.src = '';
  }
});
</script>

<template>
  <div class="video-container">
    <video
      ref="videoPlayer"
      autoplay
      playsinline
      muted
      class="video-player"
    ></video>
  </div>
</template>

<style scoped>
.video-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.video-player {
  width: 100%;
  height: auto;
}
</style>
