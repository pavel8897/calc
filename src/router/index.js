import { createRouter, createWebHistory } from 'vue-router'
import Types from '../views/Types.vue'
import Home from '../views/Home.vue'
import TheTypeOne from '../views/TheTypeOne.vue'
import TheTypeTwo from '../views/TheTypeTwo.vue'
import TheTypeThree from '../views/TheTypeThree.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/type-one',
    name: 'TheTypeOne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TheTypeOne
  },
  {
    path: '/type-two',
    name: 'TheTypeTwo',
    component: TheTypeTwo,
    meta: {
      carbonate: false
    }
  }
  ,
  {
    path: '/type-three',
    name: 'TheTypeThree',
    component: TheTypeThree,
    meta: {
      carbonate: true
    }
  },
  {
    path: '/types',
    name: 'Types',
    component: Types
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if(to.path != "/"){
    if ( store.state.activityType == "" || store.state.productionType == "") {
      return { name: 'Home' }
    }
  }
})

export default router
