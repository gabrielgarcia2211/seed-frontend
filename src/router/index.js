import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
//import Register from "../views/Register.vue";
//import ProductList from "../views/ProductList.vue";
//import CreateProduct from "../views/CreateProduct.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  //{ path: "/register", component: Register },
  //{ path: "/products", component: ProductList },
  //{ path: "/products/create", component: CreateProduct },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
