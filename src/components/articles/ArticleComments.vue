<template>
  <div>
    <PostCommentWizard
      v-if="comments"
      :id="id"
      :addComment="addComment"></PostCommentWizard>
  </div>
  <div>
    <div v-for="(comment, index) in comments" :key="index">
      <CommentCard :comment="comment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment } from "./CommentCard.vue";
import { useRouter } from "vue-router";
import { getArticleComments } from "../../utils/api";
import CommentCard from "./CommentCard.vue";
import PostCommentWizard from "./PostCommentWizard.vue";
import { ref } from "vue";
const router = useRouter();
const id = router.currentRoute.value.params.id as string;
const { comments } = ref(await getArticleComments(id)).value as {
  comments: Comment[];
};
function addComment(comment: Comment) {
  comments.unshift(comment);
}
</script>

<style lang="css" scoped></style>
