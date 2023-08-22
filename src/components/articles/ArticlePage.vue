<template>
  <main>
    <div>
      <label for="orderSelect">Order:</label>
      <select id="orderSelect" v-model="orderRef" @change="updateArticles">
        <option selected value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <label for="sortBySelect">Sort By:</label>
      <select id="sortBySelect" v-model="sortByRef" @change="updateArticles">
        <option selected value="created_at">Date</option>
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
  </main>
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

<style scoped>
/* Dark theme styling */
main {
  max-width: 90vw;
}
body {
  background-color: #181818;
  color: #e0e0e0;
  font-family: "Arial", sans-serif;
}

div {
  padding: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select {
  width: max(300px, 45%);
  text-align: center;
  box-sizing: border-box;
  padding: 0.5rem;
  background-color: #22222217;
  border: 1px solid #444;
  color: #000000;
  margin-bottom: 1rem;
}

option {
  background-color: #222;
  color: #e0e0e0;
}

router-link {
  text-decoration: none;
}

ArticleCard {
  background-color: #1f1f1f;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

ArticleCard:hover {
  background-color: #272727;
}

/* Mobile responsiveness */
@media only screen and (max-width: 768px) {
  div {
    padding: 0.5rem;
  }

  select {
    font-size: 0.9rem;
  }

  label {
    font-size: 0.9rem;
  }
}
</style>
