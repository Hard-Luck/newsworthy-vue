<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="commentBody">Comment Body:</label>
      <input id="commentBody" v-model="commentBody" type="text" required />
      <button :disabled="disabled" type="submit">Submit</button>
      <p v-if="isError">
        Sorry your comment could not be added, please try again later
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { postComment } from "../../utils/api";
import { Comment } from "./CommentCard.vue";
const commentBody = ref("");
let disabled = false;
let isError = false;
const props = defineProps<{
  id: string;
  addComment: (comment: Comment) => void;
}>();

async function submitForm() {
  try {
    isError = false;
    disabled = true;
    const data = await postComment(props.id, commentBody.value);
    props.addComment(data.comment);
    commentBody.value = "";
  } catch (error) {
    isError = true;
    console.error(error);
  } finally {
    disabled = false;
  }
}
</script>
