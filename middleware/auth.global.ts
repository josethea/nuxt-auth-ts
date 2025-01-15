export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  
  if (loggedIn.value && to.path !== '/') {
    return navigateTo('/');
  }

  if (!loggedIn.value && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }
}) 