import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useSimpleUserStore } from "@/stores/simpleUser";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/ProtectedView.vue"),
  },
  {
    path: "/intake",
    name: "intake",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/IntakeFormView.vue"),
  },
  {
    path: "/messages",
    name: "messages",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/MessagesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  // Check the route is protected & the user login status
  const user = useSimpleUserStore();
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    // redirect to Login if trying to access protected page without authentication
    // maybe fire a flash message that the user needs to login?
    return { name: "login" };
  }
});

export default router;
