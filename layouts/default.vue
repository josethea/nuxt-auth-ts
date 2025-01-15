<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <Navbar />
    <div class="flex-1 flex items-center justify-center bg-violet-800">
      <slot />
    </div>
  </div>
</template>
