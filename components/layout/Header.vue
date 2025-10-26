<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-2xl">⚽</span>
          <span class="text-xl font-bold text-primary-600">InstinctFC</span>
        </NuxtLink>

        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            to="/"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/drills"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/drills') }"
          >
            Drills
          </NuxtLink>
          <NuxtLink
            to="/stats"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === '/stats' }"
          >
            Statistics
          </NuxtLink>
        </nav>

        <button
          @click="toggleMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="menuOpen"
      class="md:hidden border-t border-gray-200 bg-white"
    >
      <nav class="px-4 py-4 space-y-2">
        <NuxtLink
          to="/"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
          :class="{ 'bg-primary-50 text-primary-700': $route.path === '/' }"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/drills"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
          :class="{ 'bg-primary-50 text-primary-700': $route.path.startsWith('/drills') }"
        >
          Drills
        </NuxtLink>
        <NuxtLink
          to="/stats"
          @click="closeMenu"
          class="block px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
          :class="{ 'bg-primary-50 text-primary-700': $route.path === '/stats' }"
        >
          Statistics
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200;
}

.nav-link-active {
  @apply text-primary-600 font-semibold;
}
</style>

