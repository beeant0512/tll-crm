export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis',
      },
      // list
      {
        path: '/customer',
        icon: 'table',
        name: 'customer',
        routes: [
          {
            path: '/customer/mine',
            name: 'mine',
            component: './Customer',
          },
          {
            path: '/customer/pool',
            name: 'pool',
            component: './Customer/pool',
          },
        ],
      },
      // 后台管理
      {
        path: '/admin',
        icon: 'table',
        name: 'admin',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/member',
            name: 'member',
            component: './Member',
          },
          {
            path: '/admin/groups',
            name: 'groups',
            component: './Groups',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
