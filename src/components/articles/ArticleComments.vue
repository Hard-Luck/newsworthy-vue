<template>
  <div class="post-comments-container">
    <PostCommentWizard
      v-if="comments.comments && comments.comments.length"
      :id="id"
      :addComment="addComment">
    </PostCommentWizard>
  </div>
  <div>
    <div v-for="(comment, index) in comments.comments" :key="index">
      <CommentCard :comment="comment" />
      <button
        v-if="comment.author === username"
        :onclick="() => handleClick(comment)">
        delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment } from "./CommentCard.vue";
import { useRouter } from "vue-router";
import { deleteComment, getArticleComments } from "../../utils/api";
import CommentCard from "./CommentCard.vue";
import PostCommentWizard from "./PostCommentWizard.vue";
import { ref } from "vue";
const router = useRouter();
const id = router.currentRoute.value.params.id as string;
const comments = ref(await getArticleComments(id));

const username = localStorage.getItem("username");
function addComment(comment: Comment) {
  comments.value.comments.unshift(comment);
}
async function handleClick(comment: Comment) {
  await deleteComment(comment.comment_id as number);
  comments.value.comments = comments.value.comments.filter(
    (c: Comment) => c.comment_id !== comment.comment_id
  );
}
</script>

<style lang="css" scoped>
.post-comments-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
