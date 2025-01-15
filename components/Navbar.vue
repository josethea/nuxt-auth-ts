<script setup lang="ts">

const { loggedIn, user, clear } = useUserSession();
const { clearSession } = useSessionComposable();

const logout = async() => {
  clearSession();
  await clear();
  navigateTo('/login');
}

</script>

<template>
  <div v-if="loggedIn && user" class="flex h-[70px] bg-white items-center justify-between px-10">
    <p class="font-bold text-5xl">Welcome, {{ user.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
