import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import SettingsView from '../views/Settings.vue'
import KnowledgeView from '../views/KnowledgeBase.vue'
import CompletedView from '../views/Completed.vue'
import ScheduledView from '../views/Scheduled.vue'
import SupportView from '../views/Support.vue'
import FormView from '../views/FormView.vue'
import LoginView from '../views/Login/Login.vue'
import TwoFactorAuth from '../views/Login/TwoFactor.vue'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'settings', name: 'Settings', component: SettingsView },
      { path: 'knowledgebase', name: 'KnowledgeBase', component: KnowledgeView },
      { path: 'completed', name: 'Completed', component: CompletedView },
      { path: 'scheduled', name: 'Scheduled', component: ScheduledView },
      { path: 'support', name: 'Support', component: SupportView },
      { path: 'form', name: 'Form', component: FormView }
    ]
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: LoginView, meta: { public: true, guestOnly: true } },
      { path: '2fa', name: 'TwoFactor', component: TwoFactorAuth, meta: { requires2FA: true, guestOnly: true } }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.public) {
    if (to.meta.guestOnly && auth.isAuthenticated) {
      return '/'
    }
    return true
  }

  if (to.meta.requires2FA) {
    if (auth.step === 2 && !auth.isAuthenticated) {
      return true
    }
    return '/auth/login'
  }

  if (to.meta.requiresAuth) {
    if (auth.isAuthenticated) {
      return true
    }

    if (auth.step === 2) {
      return '/auth/2fa'
    }

    return '/auth/login'
  }

  return true
})


export default router