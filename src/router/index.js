import Vue from 'vue';
import VueRouter from 'vue-router';
import NihilistSubstitution from '@/pages/NihilistSubstitution.vue';
import Homepage from '@/pages/Homepage.vue';
import ShrinkingGenerator from '@/pages/ShrinkingGenerator.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
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
  ],
});

const DEFAULT_TITLE = 'POD';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  next();
});

export default router;
