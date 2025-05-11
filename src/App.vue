<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { checkAuthInitData } from './services/authChecker';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/AppSidebar.vue';

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
  <SidebarProvider>
    <AppSidebar />
    <div class="page-data">
      <SidebarTrigger />
      <router-view></router-view>
    </div>
  </SidebarProvider>
</template>

<style scoped>
template {
  height: 100%;
}
.page-data {
  padding: 0.5rem;
  width: 100%;
}
</style>
