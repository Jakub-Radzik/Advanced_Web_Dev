<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <book-form ></book-form>
  </div>
</template>

<script>
// @ is an alias to /src
import BookForm from '@/components/BookForm.vue'

export default {
  name: 'AddBookView',
  components: {
    BookForm
  }
}
</script>
