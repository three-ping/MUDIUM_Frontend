export default [
    {
      path: '/musicalInfo',
      component: () => import('@/views/musical/MusicalView.vue'),
      },
      {
        path: '/musicalInfo/:id',
        name: 'MusicalDetailView',
        component: () => import('@/views/musical/MusicalDetailView.vue'),
        props: true,
    },    
  ];