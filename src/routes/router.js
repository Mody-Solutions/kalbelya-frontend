import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../plugins/store'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const session_data_string = localStorage.getItem('session_data') || ''
  if(session_data_string.length > 0){
    const session_data = JSON.parse(session_data_string)
    store.commit('auth_success',
      session_data.access_token,
      session_data.user,
      session_data.roles,
      session_data.permission
    )
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
