import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Search from '../views/Search.vue'
import Project from '../views/Project.vue'
import CreateProject from '../views/CreateProject.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'My Profile',
    component: Profile
  },
  {
    path: '/user/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/search/:type',
    name: 'Search',
    component: Search
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/create',
    name: 'Create Project',
    component: CreateProject
  }
]

const router = new VueRouter({
  routes
})

export default router
