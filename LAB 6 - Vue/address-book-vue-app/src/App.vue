<template>
  <nav>
    <router-link to="/books">Books</router-link> |
    <router-link to="/authors">Authors</router-link>
    <router-link to="/books/:id"></router-link>
    <router-link to="/books/edit/:id"></router-link>
    <router-link to="/books/add/"></router-link>
    <router-link to="/authors/edit/:id"></router-link>
    <router-link to="/authors/add/"></router-link>
    <router-link to="/authors/:id"></router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
