<script setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';

const pools = [
  { name: 'Бассейн 1', description: 'Секция 1, ряд 2', is_active: true },
  { name: 'Бассейн 2', description: 'Секция 2, ряд 3', is_active: false },
  { name: 'Бассейн 3', description: 'Секция 3, ряд 4', is_active: false },
];

const router = useRouter();
const Logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  router.push('/login');
};
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
                v-for="(pool, index) in pools"
                :key="index"
                class="pool__item"
                :class="{ 'active-pool': pool.is_active }"
              >
                <NavigationMenuLink asChild>
                  <button
                    type="button"
                    class="pool__link flex flex-col gap-1 w-full"
                  >
                    <span class="text-sm font-medium">{{ pool.name }}</span>
                    <span class="text-xs text-muted-foreground">{{
                      pool.description
                    }}</span>
                  </button>
                </NavigationMenuLink>
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
  margin-bottom: 24px;
  margin-top: 24px;
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
  background-color: var(--slate-100, #f1f5f9);
}

.pool__link {
  padding: 10px;
  width: 100%;
  text-align: left;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.pool__link:hover {
  background-color: var(--slate-50, #f9fafb);
}

.text-muted-foreground {
  color: var(--muted-foreground);
}
</style>
