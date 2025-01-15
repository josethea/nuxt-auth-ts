<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  isSignup: {
    type: Boolean,
    default: false
  }
});
const name = ref('');
const email = ref('');
const password = ref('');

const emit = defineEmits(['submit']);

const handleSubmit = () => {
  emit('submit', { name: name.value, email: email.value, password: password.value });
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1 class="text-2xl font-bold mb-5 text-center">{{ title }}</h1>
    <div class="flex flex-col gap-4">
      <div v-if="isSignup">
        <label class="block text-sm font-bold" for="name">Name</label>
        <input class="w-full border border-gray-300 rounded-md p-2" type="text" name="name" v-model="name" placeholder="Name" required />
      </div>
      <div>
        <label class="block text-sm font-bold" for="email">Email</label>
        <input class="w-full border border-gray-300 rounded-md p-2" type="email" name="email" v-model="email" placeholder="Email" required />
      </div>
      <div>
        <label class="block text-sm font-bold" for="password">Password</label>
        <input class="w-full border border-gray-300 rounded-md p-2" type="password" name="password" v-model="password" placeholder="Password" required />
      </div>
      <button class="bg-violet-600 text-white rounded-md p-2 hover:bg-violet-800 uppercase" type="submit" :disabled="loading">
        {{ loading ? 'Please wait...' : title }}
      </button>
      <a href="/auth/github" class="bg-black text-white rounded-md p-2 hover:bg-neutral-800 uppercase text-center" type="button">
        {{ title }} with Github
      </a>
      <a href="/auth/google" class="bg-white text-black border border-black rounded-md p-2 hover:bg-violet-100 uppercase text-center" type="button">
        {{ title }} with Google
      </a>
    </div>
  </form>
</template>

<style scoped>

</style>