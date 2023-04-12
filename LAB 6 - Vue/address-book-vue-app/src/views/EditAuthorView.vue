<template>
  <div class="home">
    <author-form-edit ></author-form-edit>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthorFormEdit from '@/components/AuthorFormEdit.vue'

export default {
  name: 'EditAuthorView',
  components: {
    AuthorFormEdit
  }
}
</script>
