<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <author-form ></author-form>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthorForm from '@/components/AuthorForm.vue'

export default {
  name: 'AddAuthorView',
  components: {
    AuthorForm
  }
}
</script>
