<script setup lang="ts">
definePageMeta({
  layout: false
})

const { provider } = useRoute().params;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const { session, fetch: refreshSession } = useUserSession();
const { setSession } = useSessionComposable();

onMounted(async () => {
  await refreshSession();
  setSession(toRaw(session.value));
  await delay(2000);
  navigateTo('/');
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-5">
      <h1 class="text-5xl font-bold capitalize">{{ provider }} Success</h1>
      <p class="text-xl">You'll be redirected to the home page in 3 seconds</p>
    </div>
  </div>
</template>