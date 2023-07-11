import type { RouteLocationNormalized } from "vue-router";

export default function isToken() {
  const token = localStorage.getItem("token");
  return !!token;
}

export async function redirectIfNoToken(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (!isToken() && to.path !== "/") {
    return { path: "/" };
  }
}
