<template>
    <div class="home">
        <books-table :books-data="booksData"></books-table>
    </div>
</template>

<script>
// @ is an alias to /src
import BooksTable from '@/components/BooksTable.vue'

export default {
    name: 'HomeView',
    components: {
        BooksTable,
    },
    methods: {
        getBooks() {
            fetch('http://localhost:8008/book_service/books')
                .then(response => response.json())
                .then(data => {
                    this.booksData = data;
                })
                .catch(error => console.log(error));
        },
    },
    data() {
        return { 
            booksData: []
        }
    },
    mounted() {
        this.getBooks();
    },
}
</script>
