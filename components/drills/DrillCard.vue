<template>
  <NuxtLink
    :to="`/drills/${drill.id}`"
    class="card-hover group relative block"
  >
    <!-- Completed Badge -->
    <div
      v-if="isCompleted"
      class="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
    >
      ✓ Done
    </div>

    <div class="flex items-start justify-between mb-4">
      <div
        class="text-5xl group-hover:scale-110 transition-transform duration-200"
      >
        {{ drill.icon }}
      </div>
      <span
        :class="[
          'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
          difficultyColors[drill.difficulty]
        ]"
      >
        {{ drill.difficulty }}
      </span>
    </div>

    <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
      {{ drill.name }}
    </h3>
    
    <p class="text-gray-600 mb-4 text-sm line-clamp-2">
      {{ drill.description }}
    </p>

    <!-- Drill Details -->
    <div class="space-y-2 text-sm text-gray-500">
      <div class="flex items-center space-x-2">
        <span>👥</span>
        <span>{{ drill.playersNeeded }} players</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>⏱️</span>
        <span>{{ drill.duration }} minutes</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>📏</span>
        <span>{{ drill.spaceRequired }}</span>
      </div>
    </div>

    <!-- Has Video Badge -->
    <div v-if="drill.videoUrl" class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex items-center text-sm text-primary-600">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
        <span class="font-medium">Video Available</span>
      </div>
    </div>

    <!-- Training Mode Badge -->
    <div class="mt-3 pt-3 border-t border-gray-200">
      <div class="flex items-center text-sm text-indigo-600">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        <span class="font-medium">Interactive Training</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';
import type { DrillConfig } from '~/types/drill';

const props = defineProps<{
  drill: DrillConfig;
}>();

const drillStore = useDrillStore();
const isCompleted = computed(() => drillStore.isCompleted(props.drill.id));

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-orange-100 text-orange-700',
  pro: 'bg-red-100 text-red-700',
};
</script>

