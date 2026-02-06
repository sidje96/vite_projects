import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import SettingsView from '../views/Settings.vue'
import DocumentationView from '../views/Documentation.vue'
import ReportsView from '../views/Reports.vue'
import AddReportView from '../views/Add-report.vue'
import TestView from '../views/Test.vue'

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
    path: '/documentation',
    name: 'documentation',
    component: DocumentationView
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsView
  },
  {
    path: '/add-report',
    name: 'add-report',
    component: AddReportView
  },
  {
    path: '/Test',
    name: 'Test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router