import { useSessionStore } from '~/store/session';

export default defineNuxtPlugin((nuxtApp) => {
  const sessionStore = useSessionStore();
  sessionStore.initializeSession();
})