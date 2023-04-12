<template>
    <div id="authors-table">
        <router-link to="/authors/add">Add new author</router-link>
        <table>
            <!-- ...thead... -->
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Books</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="author in authorsData.slice(
                        startRow,
                        startRow + rowsPerPage
                    )"
                    :key="author.id"
                >
                    <td>{{ author.id }}</td>
                    <td>{{ author.name }}</td>
                    <td>{{ author.surname }}</td>
                    <td>
                        <ul>
                            <li v-for="book in author.books" :key="book.id">
                                {{ book.title }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <router-link :to="'/authors/' + author.id"
                            >Details</router-link
                        >
                    </td>
                    <td>
                        <router-link :to="'/authors/edit/' + author.id"
                            >Edit</router-link
                        >
                    </td>
                    <td>
                        <button @click="deleteAuthor(author.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="page-navigation">
        <button @click="movePages(-1)">Back</button>
        <p>
            {{ startRow / rowsPerPage + 1 }} out of
            {{ Math.ceil(authorsData.length / rowsPerPage) }}
        </p>
        <button @click="movePages(1)">Next</button>
    </div>
</template>

<script>
export default {
    name: 'authors-table',
    props: {
        authorsData: Array,
    },
    data() {
        return {
            startRow: 0,
            rowsPerPage: 10,
        }
    },
    methods: {
        deleteAuthor(id) {
            fetch('http://localhost:8008/author/authors/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            if (newStartRow >= 0 && newStartRow < this.authorsData.length) {
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
