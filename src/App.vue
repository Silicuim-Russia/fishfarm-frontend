<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { checkAuthInitData } from './services/authChecker';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './components/AppSidebar.vue';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const isAuthenticated = await checkAuthInitData();

  if (!isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <div v-if="route.path === '/login'">
    <router-view></router-view>
  </div>
  <div v-else>
    <Toaster />
    <SidebarProvider>
      <AppSidebar />
      <div class="page-data">
        <SidebarTrigger />
        <router-view></router-view>
      </div>
    </SidebarProvider>
  </div>
</template>

<style scoped>
.page-data {
  padding: 0.5rem;
  width: 100%;
}
</style>
