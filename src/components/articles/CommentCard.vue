<template>
  <div class="comment-card">
    <p class="comment-body">{{ comment.body }}</p>
    <div class="comment-metadata">
      <p class="comment-author">{{ comment.author }} <span>- Author</span></p>
      <p class="comment-date">{{ comment.created_at }}</p>
      <p class="comment-votes">{{ comment.votes }} <span>Votes</span></p>
    </div>
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

<style lang="css" scoped>
.comment-card {
  max-width: 90%;
  margin: 1rem auto;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
}

.comment-body {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.comment-metadata {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.comment-author,
.comment-votes,
.comment-date {
  margin: 0;
}

.comment-author span,
.comment-votes span {
  font-weight: bold;
  margin-left: 0.3rem;
}
</style>
