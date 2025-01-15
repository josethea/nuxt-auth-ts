import { useSessionStore } from '~/store/session';

export const useSessionComposable = () => {
  
  const sessionStore = useSessionStore();

  const setSession = (session: any) => {
    sessionStore.setSession(session);
  }

  const clearSession = () => {
    sessionStore.clearSession();
  }

  return {
    setSession,
    clearSession
  }
}