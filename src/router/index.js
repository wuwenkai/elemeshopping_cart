import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/pages/goods/goods';
import Ratings from '@/pages/ratings/ratings';
import Seller from '@/pages/seller/seller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
});
