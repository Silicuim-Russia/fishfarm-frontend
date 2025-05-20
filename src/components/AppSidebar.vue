<script setup>
import {
  ClipboardList,
  PencilLine,
  Home,
  LogOut,
  Settings,
} from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';

const logOut = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
</script>

<template>
  <Sidebar variant="floating" collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <!-- Кнопки -->
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <router-link :to="{ name: 'SelectPage' }">
                  <component :is="Home" />
                  <span>Главная</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <router-link :to="{ name: 'CreatePage' }">
                  <component :is="PencilLine" />
                  <span>Новый бассейн</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <router-link :to="{ name: '' }">
                  <component :is="ClipboardList" />
                  <span>Последние изменения</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <router-link :to="{ name: 'SelectPage' }">
              <component :is="Settings" />
              <span>Настройки</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild @click="logOut">
            <router-link :to="{ name: 'LoginPage' }">
              <component :is="LogOut" />
              <span>Выйти</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
