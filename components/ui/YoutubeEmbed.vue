<template>
  <div class="relative w-full" style="padding-bottom: 56.25%">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}?rel=0`"
      class="absolute top-0 left-0 w-full h-full rounded-lg"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  videoId: string;
}

defineProps<Props>();
</script>

