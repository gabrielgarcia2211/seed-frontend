import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ProductList from "../views/ProductList.vue";
import FormularioUsuario from "../views/FormularioUsuario.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/products", component: ProductList, meta: { requiresAuth: true } },
  { path: "/form", component: FormularioUsuario},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.path === "/login" && token) {
    next("/products");
  } else {
    next();
  }
});
export default router;
