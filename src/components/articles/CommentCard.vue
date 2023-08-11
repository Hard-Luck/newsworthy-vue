<template>
  <div class="comment-card">
    <p>{{ comment.body }}</p>
    <p>{{ comment.created_at }}</p>
    <p>{{ comment.author }} - Author</p>
    <p>{{ comment.votes }} - Votes</p>
  </div>
</template>

<script lang="ts" setup>
export interface Comment {
  comment_id?: number;
  body: string;
  votes: number;
  author: string;
  article_id?: number;
  created_at: number;
}

defineProps<{ comment: Comment }>();
</script>

<style lang="scss" scoped></style>
