export default [
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            {path: '/user/login', component: './Login'},
            {component:'./404'}
        ]
    },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            {
                name: 'admin',
                path: '/admin',
                icon: 'apple',
                routes: [
                    {path: '/admin/home', component: './Home', name: 'home'},
                    {component:'./404'}
                ]
            },
            {
                name: 'system',
                path: '/system',
                icon: 'icon-system-mgr',
                component: './Home'
            }
        ]
    },
    {component: './404'}   
]
