import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../pages/LoginPage.vue";
import TodosPage from "../pages/TodosPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/todos',
      component: TodosPage,
     },
  ],
})