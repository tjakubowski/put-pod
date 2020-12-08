import Vue from 'vue';
import VueRouter from 'vue-router';
import NihilistSubstitution from '@/pages/NihilistSubstitution.vue';
import Homepage from '@/pages/Homepage.vue';
import ShrinkingGenerator from '@/pages/ShrinkingGenerator.vue';
import StreamCipher from '@/pages/StreamCipher';
import { publicPath } from '../../vue.config';
import FipsTests from '../pages/FipsTests';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: publicPath,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
      meta: {
        title: 'POD',
      },
    },
    {
      path: '/nihilist-substitution',
      name: 'nihilist',
      component: NihilistSubstitution,
      meta: {
        title: 'Nihilist Substitution',
      },
    },
    {
      path: '/shrinking-generator',
      name: 'shrinking',
      component: ShrinkingGenerator,
      meta: {
        title: 'Shrinking Generator',
      },
    },
    {
      path: '/stream-cipher',
      name: 'stream-cipher',
      component: StreamCipher,
      meta: {
        title: 'Stream cipher',
      },
    },
    {
      path: '/fips',
      name: 'fips-140-2',
      component: FipsTests,
      meta: {
        title: 'FIPS 140-2 tests',
      },
    },
  ],
});

const DEFAULT_TITLE = 'POD';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});

export default router;
