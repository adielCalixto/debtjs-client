import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login', '/error'];
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = store.state.auth.status.loggedIn
    if (authRequired && !loggedIn) {
        return next('/login');
    }    
    next();
})

export default router;