<template>
  <div>
    <div>
      <div v-for="(article, index) in articles" :key="index">
        <router-link :to="`/articles/${article.article_id}`">
          <ArticleCard :article="article" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard.vue";
const router = useRouter();
const topic = router.currentRoute.value.params.topic as string;
const articles = await getArticles(topic);
</script>

<style lang="css" scoped></style>
