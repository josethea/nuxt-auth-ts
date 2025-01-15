<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';

definePageMeta({
  layout: 'auth'
});

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const { session, fetch: refreshSession } = useUserSession();
const { setSession } = useSessionComposable();
const loading = ref(false);

const signup = async (data: FormData) => {
  loading.value = true;
  try {
    await $fetch('/api/auth/signup', { method: 'POST', body: data });
    await refreshSession();
    setSession(session);
    navigateTo('/');
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg flex flex-col gap-5">
    <AuthForm :loading="loading" :isSignup="true" @submit="signup" title="Sign Up" />
    <p class="text-center">Already have an account? <nuxt-link class="text-blue-500 hover:underline" :to="{ name: 'login' }">Log in</nuxt-link></p>
  </div>
</template>

<style scoped>

</style>