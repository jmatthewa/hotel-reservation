import { createRouter, createWebHistory  } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RoomDetails from '@/views/RoomDetails.vue'
import LoginView from '@/views/LoginView.vue'
import SignUp from '@/views/SignUp.vue'
import InfoView from '@/views/InfoView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView

  },
  {
    path: '/room/:id',
    name: 'room',
    component: RoomDetails

  },
  {
    path: '/login',
    name: 'login',
    component: LoginView

  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp

  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  }

  
]

const router = createRouter({
  history: createWebHistory (),
  routes,

})

export default router
