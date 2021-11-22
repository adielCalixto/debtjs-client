const routes = [
{
    path: '/a',
    component: () => import('@/pages/Site.vue'),
    children: [
        {
            path: '/a/person/:id(\\d+)',
            component: () => import('@/pages/Site/Person.vue')
        },
        {
            path: '/a/search',
            component: () => import('@/pages/Site/Search.vue')
        },
        {
            path: '/a/debt',
            component: () => import('@/pages/Site/Debt.vue')
        },
    ]
},
{
    path: '/',
    component: () => import('@/pages/Home.vue'),
},
{
    path: '/login',
    component: () => import('@/pages/Login.vue')
},
{
    path: '/error',
    component: () => import('@/pages/Error.vue')
},
{
    path: '/:pathMatch(.*)',
    redirect: '/error'
}
]

export default routes