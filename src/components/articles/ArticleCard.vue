<script setup lang="ts">
import { ArticleFromApi } from "../../types/api";
defineProps<{ article: ArticleFromApi }>();
</script>

<template>
  <main>
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
  </main>
</template>

<style lang="css" scoped>
main {
  max-width: 90svw;
}
.article-top img {
  max-width: 100%;
  height: auto;
  display: block;
}
article {
  padding: 1rem;
  border-radius: 5px;
  overflow: hidden;
}
.article-top {
  position: relative;
}

.article-top h3 {
  margin-top: 0;
}
.article-bottom p {
  margin-bottom: 0;
}

/* Mobile optimizations */
@media only screen and (max-width: 768px) {
  article {
    padding: 0.5rem;
  }
}
</style>
