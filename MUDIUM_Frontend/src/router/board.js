export default [
    {
        path: '/board',
        component: () => import('@/views/board/BoardRoot.vue'),
        redirect: {path:"/board/view"},
        children: [
            {
                path: 'view',
                component: () => import('@/views/board/BoardView.vue'),
            },
        ],
    },
];
