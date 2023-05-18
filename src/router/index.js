import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView,
      meta: {
        description: "Home Page",
      },
    },
    {
      name: "CityView",
      path: "/city/:cityname/:statename",
      component: CityView,
      meta: {
        description: "City View",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.statename
      ? `${to.params.cityname}, ${to.params.statename}`
      : to.meta.description
  } | The Local Weather`;
  next();
});

export default router;
