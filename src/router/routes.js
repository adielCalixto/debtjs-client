const routes = [
{
    path: '/',
    component: () => import('@/pages/Web'),
    children: [
    {
        path: '/',
        component: () => import('@/pages/Web/Home')
    },
    {
        path: '/person/:person_id',
        component: () => import('@/pages/Web/Person')
    },
    {
        path: '/search',
        component: () => import('@/pages/Web/Search')
    },
    {
        path: '/debt',
        component: () => import('@/pages/Web/Debt')
    },
    ]
},
{
    path: '/login',
    component: () => import('@/pages/Login')
},
{
    path: '/error',
    component: () => import('@/pages/Error')
},
]

export default routes