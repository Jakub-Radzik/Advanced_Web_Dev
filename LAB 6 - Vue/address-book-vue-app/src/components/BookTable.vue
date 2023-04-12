<template>
    <div id="books-table">
        <table>
            <!-- ...thead... -->
            <thead>
                <tr>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ bookData.title }}</td>
                    <td>{{ bookData.author?.name + ' ' + bookData.author?.surname }}</td>
                    <td>{{ bookData.pages }}</td>
                    <td>
                        <router-link :to="'/books/edit/' + bookData.id">Edit</router-link>
                    </td>
                    <td>
                        <button @click="deleteBook(bookData.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'books-table',
    props: {
        bookData: Object,
    },
    methods: {
        deleteBook(id) {
            fetch('http://localhost:8008/book_service/books/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.$router.push('/books')
                })
                .catch(error => console.log(error));
        },
    },
}
</script>

<style scoped>
body {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #444;
}

table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -user-select: none;
}

td {
    background-color: #f9f9f9;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

#search {
    margin-bottom: 10px;
}

#page-navigation {
    display: flex;
    margin-top: 5px;
}

#page-navigation p {
    margin-left: 5px;
    margin-right: 5px;
}

#page-navigation button {
    background-color: #42b983;
    border-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
}
</style>
