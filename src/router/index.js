import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import SettingsView from '../views/Settings.vue'
import KnowledgeView from '../views/KnowledgeBase.vue'
import CompletedView from '../views/Completed.vue'
import ScheduledView from '../views/Scheduled.vue'
import ActiveTaskView from '../views/ActiveTask.vue'
import InformationView from '../views/Information.vue'

const routes = [
  { path: '/',
    name: 'Home',
    component: HomeView 
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/knowledgebase',
    name: 'KnowledgeBase',
    component: KnowledgeView
  },
  {
    path: '/completed',
    name: 'Completed',
    component: CompletedView
  },
  {
    path: '/scheduled',
    name: 'Scheduled',
    component: ScheduledView
  },
  {
    path: '/active-task',
    name: 'ActiveTask',
    component: ActiveTaskView
  },
  {
    path: '/information',
    name: 'Information',
    component: InformationView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router