<template>
  <div>
    <div>
      <div v-for="(comment, index) in comments" :key="index">
        <CommentCard :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment } from "./CommentCard.vue";
import { useRouter } from "vue-router";
import { getArticleComments } from "../../utils/api";
import CommentCard from "./CommentCard.vue";
const router = useRouter();
const id = router.currentRoute.value.params.id as string;
const { comments } = (await getArticleComments(id)) as { comments: Comment[] };
</script>

<style lang="css" scoped></style>
