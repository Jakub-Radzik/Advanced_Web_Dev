<template>
    <div class="authorview">
        <author-table :author-data="authorData"></author-table>
    </div>
</template>

<script>
// @ is an alias to /src
import AuthorTable from '@/components/AuthorTable.vue'

export default {
    name: 'HomeView',
    components: {
        AuthorTable,
    },
    methods: {
        getauthors() {
            fetch('http://localhost:8008/author/authors/' + this.$route.params.id)
                .then(response => response.json())
                .then(data => {
                    this.authorData = data;
                })
                .catch(error => console.log(error));
        },
    },
    data() {
        return { 
            authorData: {}
        }
    },
    mounted() {
        this.getauthors();
    },
}
</script>
