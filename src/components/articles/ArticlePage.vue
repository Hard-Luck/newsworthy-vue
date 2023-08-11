<template>
  <div>
    <div>
      <label for="orderSelect">Order:</label>
      <select id="orderSelect" v-model="orderRef" @change="updateArticles">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <label for="sortBySelect">Sort By:</label>
      <select id="sortBySelect" v-model="sortByRef" @change="updateArticles">
        <option value="created_at">Date</option>
        <option value="title">Title</option>
        <option value="votes">Votes</option>
        <option value="author">Author</option>
      </select>

      <div v-for="(article, index) in articles" :key="index">
        <router-link :to="`/articles/${article.article_id}`">
          <ArticleCard :article="article" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard.vue";
import { ArticleFromApi } from "../../types/api";

const router = useRouter();
const route = useRoute();
const topic = route.params.topic as string;

let orderRef = ref(route.query.order as "asc" | "desc"); // default to "asc" if no order param
let sortByRef = ref(route.query.sort_by as "title" | "created_at" | "votes"); // default to "date" if no sort_by param

let articles = ref<ArticleFromApi[]>([]);

// Fetch articles initially
updateArticles();

watchEffect(async () => {
  if (
    route.query.order !== orderRef.value ||
    route.query.sort_by !== sortByRef.value
  ) {
    await updateArticles();
  }
});

async function updateArticles() {
  router.push({ query: { order: orderRef.value, sort_by: sortByRef.value } });
  articles.value = await getArticles({
    topic,
    order: orderRef.value,
    sort_by: sortByRef.value,
  });
}
</script>
