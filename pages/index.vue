<script setup lang="ts">

const { days, getDays } = useDaysComposable();

getDays();

</script>

<template>
  <div>
    <p class="font-bold text-5xl">Home</p>
    <div v-if="days.length > 0">
      <p>{{ days.length }}</p>
    </div>
    <div v-else>
      <p>No days found</p>
    </div>
  </div>
</template>
