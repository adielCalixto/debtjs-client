const routes = [
{
    path: '/',
    component: () => import('@/views/Index/Index.vue'),
},
{
    path: '/a',
    component: () => import('@/views/Admin/Admin.vue'),
    children: [
        {
            path: '/a/person/:id(\\d+)',
            component: () => import('@/views/Admin/Person.vue')
        },
        {
            path: '/a/search',
            component: () => import('@/views/Admin/Search.vue')
        },
        {
            path: '/a/debt',
            component: () => import('@/views/Admin/Debt.vue')
        },
    ]
},
{
    path: '/login',
    component: () => import('@/views/Auth/Login.vue')
},
{
    path: '/error',
    component: () => import('@/views/Error/Error.vue')
},
{
    path: '/:pathMatch(.*)',
    redirect: '/error'
}
]

export default routes