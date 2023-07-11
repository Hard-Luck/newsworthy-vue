import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import LogIn from "./components/LogIn.vue";
import NotFound from "./components/NotFound.vue";
import { redirectIfNoToken } from "./utils/api/authentication";

const routes = [
  {
    path: "/",
    component: LogIn,
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(redirectIfNoToken);
const app = createApp(App);
app.use(router);
app.mount("#app");
