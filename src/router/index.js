import Vue from 'vue';
import VueRouter from 'vue-router';
import NihilistSubstitution from '@/pages/NihilistSubstitution.vue';
import Homepage from '@/pages/Homepage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/nihilist-substitution',
      name: 'nihilist',
      component: NihilistSubstitution,
    },
  ],
});
