// export default {
//     routes: [{
//         path: '/',
//         component: '@/layout/index.js',
//         routes: [
//             {
//                 path: '/brand_recognition',
//                 component: '@/pages/Brand/index'
//             }
//         ]
//     },
//     ]
// }

export default {
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/brand_recognition',
          component: '@/pages/brand/index',
        },
      ],
    },
  ],
};
