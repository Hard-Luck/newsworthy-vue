<template>
  <main>
    <div class="" v-if="article">
      <div class="article-top">
        <h1>
          {{ article.title }}
        </h1>
        <RouterLink :to="topicPath"
          ><h2>{{ article.topic }}</h2></RouterLink
        >
        <img
          class="article-img"
          :src="article.article_img_url"
          :alt="article.title" />
        <p>{{ article.body }}</p>
      </div>
      <div class="article-bottom">
        <p>{{ new Date(article.created_at) }}</p>
        <button :disabled="disabled" @click="handleClick">
          Votes {{ article?.votes || 0 }}
        </button>
      </div>
      <ArticleComments />
    </div>
  </main>
</template>

<script setup lang="ts">
import { getArticleById } from "../../utils/api";

import { RouterLink, useRouter } from "vue-router";
import ArticleComments from "../articles/ArticleComments.vue";
import { ref } from "vue";
import { voteOnArticle } from "../../utils/api";
const router = useRouter();
const id = router.currentRoute.value.params.id as string;
const { article: temp } = await getArticleById(id);
const article = ref(temp);
const topicPath = "/topics/" + article.value.topic;
let disabled = ref(false);
const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  disabled.value = true;
  article.value.votes++;
  voteOnArticle(id)
    .catch(() => article.value.votes--)
    .finally(() => {
      disabled.value = false;
    });
};
</script>

<style lang="css" scoped>
h1 {
  font-size: 2em;
}
.article-img {
  max-width: 80vw;
}
</style>
