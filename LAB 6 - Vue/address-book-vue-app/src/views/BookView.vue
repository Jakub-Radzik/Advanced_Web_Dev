<template>
    <div class="bookview">
        <book-table :book-data="bookData"></book-table>
    </div>
</template>

<script>
// @ is an alias to /src
import BookTable from '@/components/BookTable.vue'

export default {
    name: 'HomeView',
    components: {
        BookTable,
    },
    methods: {
        getBooks() {
            fetch('http://localhost:8008/book_service/books/' + this.$route.params.id)
                .then(response => response.json())
                .then(data => {
                    this.bookData = data;
                })
                .catch(error => console.log(error));
        },
    },
    data() {
        return { 
            bookData: {}
        }
    },
    mounted() {
        this.getBooks();
    },
}
</script>
