<script setup lang="ts">
import { ArticleFromApi } from "../../types/api";
defineProps<{ article: ArticleFromApi }>();
</script>
<template>
  <article>
    <div class="article-top">
      <h3>{{ article.title }}</h3>
      <img
        :src="article.article_img_url"
        :alt="article.title + ' - ' + article.topic" />
      <p>{{ article.author }} - {{ new Date(article.created_at) }}</p>
    </div>
    <div class="article-bottom">
      <p>comments: {{ article.comment_count }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
