export default [
    {
        path: '/notice',
        component: () => import('@/views/notice/NoticeRoot.vue'),
        redirect: {path:"/notice/view"},
        children: [
            {
                path: 'view',
                component: () => import('@/views/notice/NoticeView.vue'),
            },
            {
                path: 'view/:id',  // :id는 동적 라우트 매개변수
                name: 'NoticeDetailView',
                component: () => import('@/views/notice/NoticeDetailView.vue')    
            },
            // {
            //     path: 'create',  
            //     name: 'BoardCreate',
            //     component: () => import('@/views/board/BoardCreate.vue')    
            // },
            // {
            //     path: 'view/no-args',  
            //     name: 'BoardNoArgs',
            //     component: () => import('@/views/board/BoardNoArgs.vue')    
            // },
            // {
            //     path: 'edit/:id',  
            //     name: 'BoardUpdate',
            //     component: () => import('@/views/board/BoardUpdate.vue')    
            // }
        ],
    },
];
