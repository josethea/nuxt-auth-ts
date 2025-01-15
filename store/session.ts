import { defineStore } from 'pinia';
import { ref, toRaw } from 'vue';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
}

interface Session {
  user: User | null;
  loggedInAt: Date | null;
}

export const useSessionStore = defineStore('sessionStore', () => {

  const session = ref<Session>({
    user: null,
    loggedInAt: null
  })

  const setSession = (newSession: any) =>  {
    session.value = newSession;
    Cookies.set('session', JSON.stringify(toRaw(session.value)));
  }
  const clearSession = () => {
    session.value = {
      user: null,
      loggedInAt: null
    };
    Cookies.remove('session');
  }

  const initializeSession = () => {
    const initSession = Cookies.get('session')
    if (initSession) {
      session.value = JSON.parse(initSession);
    }
  }

  return {
    session,
    setSession,
    clearSession,
    initializeSession
  }
})