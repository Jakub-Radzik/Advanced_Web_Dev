<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <book-form-edit ></book-form-edit>
  </div>
</template>

<script>
// @ is an alias to /src
import BookFormEdit from '@/components/BookFormEdit.vue'

export default {
  name: 'AddBookView',
  components: {
    BookFormEdit
  }
}
</script>
