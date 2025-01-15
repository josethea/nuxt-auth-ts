export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()
  
  if (loggedIn.value && (to.path !== '/' && !to.path.includes('success'))) {
    return navigateTo('/');
  }

  if (!loggedIn.value && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }
}) 