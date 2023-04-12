<template>
    <div id="books-table">
        <router-link to="/books/add">Add new book</router-link>
        <table>
            <!-- ...thead... -->
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Borrowed</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Borrowing</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in booksData.slice(startRow, startRow + rowsPerPage)" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author.name + ' ' + book.author.surname }}</td>
                    <td>{{ book.pages }}</td>
                    <td>{{ book.is_borrowed ? 'Yes' : 'No' }}</td>
                    <td>
                        <router-link :to="'/books/' + book.id"
                            >Details</router-link
                        >
                    </td>
                    <td>
                        <router-link :to="'/books/edit/' + book.id"
                            >Edit</router-link
                        >
                    </td>
                    <td>
                        <button @click="deleteBook(book.id)">Delete</button>
                    </td>
                    <td v-if="!book.is_borrowed">
                        <button @click="borrowBook(book.id)">Borrow</button>
                    </td>
                    <td v-else>
                        <button @click="returnBook(book.id)">Return</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="page-navigation">
        <button @click="movePages(-1)">Back</button>
        <p>
            {{ startRow / rowsPerPage + 1 }} out of
            {{ Math.ceil(booksData.length / rowsPerPage) }}
        </p>
        <button @click="movePages(1)">Next</button>
    </div>
</template>

<script>
export default {
    name: 'books-table',
    props: {
        booksData: Array,
    },
    data() {
        return {
            startRow: 0,
            rowsPerPage: 10,
        }
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
                    console.log(data)
                    this.$router.go()
                })
                .catch(error => console.log(error))
        },
        borrowBook(id) {
            fetch('http://localhost:8008/book_service/books/borrow', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.$router.go()
                })
                .catch(error => console.log(error))
        },
        returnBook(id) {
            fetch('http://localhost:8008/book_service/books/return', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.$router.go()
                })
                .catch(error => console.log(error))
        },
        movePages: function (amount) {
            var newStartRow = this.startRow + amount * this.rowsPerPage
            if (newStartRow >= 0 && newStartRow < this.booksData.length) {
                this.startRow = newStartRow
            }
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
