<template>
    <div class="home">
        <authors-table :authors-data="authorsData"></authors-table>
    </div>
</template>

<script>
// @ is an alias to /src
import AuthorsTable from '@/components/AuthorsTable.vue'

export default {
    name: 'HomeView',
    components: {
        AuthorsTable,
    },
    methods: {
        getauthors() {
            fetch('http://localhost:8008/author/authors')
                .then(response => response.json())
                .then(data => {
                    this.authorsData = data;
                })
                .catch(error => console.log(error));
        },
    },
    data() {
        return { 
            authorsData: []
        }
    },
    mounted() {
        this.getauthors();
    },
}
</script>
