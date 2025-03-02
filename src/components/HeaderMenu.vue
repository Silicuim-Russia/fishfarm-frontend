<script setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast';
import { usePoolsStore } from '../../stores/poolsStore';
import { ref, watch } from 'vue';

const poolsStore = usePoolsStore();
const router = useRouter();
const route = useRoute();
const { toast } = useToast();
const pool_id_active = ref(null);

const Logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/login');
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      pool_id_active.value = Number(newId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="header__container">
    <NavigationMenu>
      <NavigationMenuList>
        <!-- Раздел "Бассейн" -->
        <NavigationMenuItem>
          <NavigationMenuTrigger>Бассейн</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="menu__container">
              <li
                v-for="pool in poolsStore.allPools"
                :key="pool.pool_id"
                class="pool__item"
                :class="{
                  'active-pool': pool.pool_id === pool_id_active,
                }"
              >
                <!-- Используем тег <a> для навигации с перезагрузкой -->
                <a
                  :href="`/pool/${pool.pool_id}`"
                  class="pool__link flex flex-col gap-1 w-full"
                >
                  <span class="text-sm font-medium">{{ pool.pool_name }}</span>
                  <span class="text-xs text-muted-foreground">{{
                    pool.pool_desc
                  }}</span>
                </a>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <!-- Раздел "Учетная запись" -->
        <NavigationMenuItem>
          <NavigationMenuTrigger>Учетная запись</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px]">
              <li class="flex items-center space-x-4">
                <NavigationMenuLink @click="Logout">
                  <Button variant="outline" class="w-full justify-center">
                    Выйти
                  </Button>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>

<style scoped>
.header__container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 24px;
}

.menu__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 24px;
  width: 300px;
  border-radius: 6px;
  border: 1px solid var(--slate-200, #e2e8f0);
  background: #fff;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.09);
}

.pool__item {
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.pool__item.active-pool {
  background-color: var(--slate-50, #f1f5f9);
}

.pool__link {
  padding: 10px;
  width: 100%;
  text-align: left;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.pool__link:hover {
  background-color: var(--slate-50, #f1f5f9);
}

.text-muted-foreground {
  color: var(--muted-foreground);
}
</style>
