<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';
import { toRaw } from 'vue';

interface FormData {
  email: string;
  password: string;
}

definePageMeta({
  layout: 'auth'
});

const { session, fetch: refreshSession } = useUserSession();
const { setSession } = useSessionComposable();
const loading = ref(false);

const login = async (data: FormData) => {
  loading.value = true;
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: data });
    await refreshSession();
    setSession(toRaw(session.value));
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
    <AuthForm :loading="loading" :isSignup="false" @submit="login" title="Log In" />
    <p class="text-center">Don't have an account? <nuxt-link class="text-blue-500 hover:underline" :to="{ name: 'signup' }">Sign up</nuxt-link></p>
  </div>
</template> 

<style scoped>

</style> 