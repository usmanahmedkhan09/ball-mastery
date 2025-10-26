<template>
  <div class="min-h-screen flex flex-col">
    <NuxtRouteAnnouncer />
    <LayoutHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const drillStore = useDrillStore();

// Initialize drills on app mount
onMounted(() => {
  drillStore.initDrills();
});
</script>

