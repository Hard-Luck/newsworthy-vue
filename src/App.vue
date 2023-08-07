<script setup lang="ts">
import { RouterView } from "vue-router";
import LoadingSpinner from "./components/LoadingSpinner.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView :key="$route.fullPath"></RouterView>
    </template>
    <template #fallback> <LoadingSpinner /></template>
  </Suspense>
  <router-link to="/articles">Articles</router-link>
</template>

<style scoped>
.logo {
  height: 5em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
