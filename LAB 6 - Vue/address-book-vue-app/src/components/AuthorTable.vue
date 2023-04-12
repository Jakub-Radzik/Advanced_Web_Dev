<template>
    <div id="author-table">
        <table>
            <!-- ...thead... -->
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Books</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ authorData.name }}</td>
                    <td>{{ authorData.surname }}</td>
                    <td>
                        <ul>
                            <li v-for="book in authorData.books" :key="book.id">
                                {{ book.title }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        <router-link :to="'/authors/edit/' + authorData.id"
                            >Edit</router-link
                        >
                    </td>
                    <td>
                        <button @click="deleteAuthor(authorData.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'authors-table',
    props: {
        authorData: Object,
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
                    this.$router.push('/authors')
                })
                .catch(error => console.log(error))
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
