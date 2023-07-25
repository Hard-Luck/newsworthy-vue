import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import LogIn from "./components/LoginPage.vue";
import NotFound from "./components/NotFound.vue";
import ArticlePage from "./components/articles/ArticlePage.vue";
import { redirectIfNoToken } from "./utils/api/authentication";
import IndividualArticlePage from "./components/articles/IndividualArticlePage.vue";

const routes = [
  {
    path: "/",
    component: LogIn,
  },
  { path: "/articles", component: ArticlePage },
  { path: "/articles/:id", component: IndividualArticlePage },
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
