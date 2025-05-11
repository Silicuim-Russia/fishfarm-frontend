<script setup>
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelRightClose } from 'lucide-vue-next';
import { useSidebar } from './utils';

const { toggleSidebar, state } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    @click="toggleSidebar"
  >
    <component :is="state === 'expanded' ? PanelLeftClose : PanelRightClose" />
  </Button>
</template>
