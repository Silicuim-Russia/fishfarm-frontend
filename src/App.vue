<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkAuthInitData } from './services/authChecker';

const router = useRouter();

onMounted(async () => {
  const isAuthenticated = await checkAuthInitData();

  if (!isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <Toaster />
  <router-view></router-view>
</template>

<style scoped>
template {
  height: 100%;
}
</style>
