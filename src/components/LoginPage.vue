<script lang="ts">
import { logIn } from "../utils/api";
export default {
  data() {
    return {
      username: "",
      password: "",
      logInError: false,
    };
  },
  methods: {
    async handleSubmit() {
      const data = await logIn(this.username, this.password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", this.username);
        this.$router.push("/articles");
        this.logInError = false;
      } else {
        this.logInError = true;
      }
    },
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required /><br /><br />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        required /><br /><br />

      <button type="submit">Submit</button>
      <p v-if="logInError" class="error-message">Log In Failed</p>
    </form>
  </div>
</template>

<style lang="css" scoped>
.error-message {
  color: red;
}
</style>
