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
import { getArticles } from "../../utils/api";
import ArticleCard from "./ArticleCard.vue";

const articles = await getArticles();
</script>

<style lang="css" scoped></style>
