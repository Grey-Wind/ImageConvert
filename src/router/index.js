import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/convert/document",
      name: "documentConvert",
      component: () => import("../views/documentConvert/index.vue"),
    },
    {
      path: "/convert/document/docx2pdf",
      name: "docx2pdf",
      component: () => import("../views/documentConvert/docx2pdf.vue"),
    },
  ],
});

export default router;
