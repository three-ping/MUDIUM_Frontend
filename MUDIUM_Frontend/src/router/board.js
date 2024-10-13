export default [
    {
        path: '/board',
        component: () => import('@/views/board/BoardView.vue'),
        redirect: {path:"/board/view"},
        children: [
            {
                path: 'view',
                component: () => import('@/views/board/BoardView.vue'),
            },
            {
                path: 'view/:id',  // :id는 동적 라우트 매개변수
                name: 'BoardDetailView',
                component: () => import('@/views/board/BoardDetailView.vue')    
            },
        ],
    },
];
