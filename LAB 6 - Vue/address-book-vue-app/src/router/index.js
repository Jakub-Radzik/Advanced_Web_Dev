import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/books',
        name: 'books',
        component: () =>
            import(/* webpackChunkName: "books" */ '../views/BooksView.vue'),
    },
    {
        path: '/books/:id',
        name: 'book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "book" */ '../views/BookView.vue'),
    },
    {
        path: '/authors',
        name: 'authors',
        component: () =>
            import(
                /* webpackChunkName: "authors" */ '../views/AuthorsView.vue'
            ),
    },
    {
        path: '/authors/:id',
        name: 'author',
        component: () =>
            import(/* webpackChunkName: "author" */ '../views/AuthorView.vue'),
    },
    {
        path: '/books/edit/:id',
        name: 'editBook',
        component: () =>
            import( /* webpackChunkName: "editBook" */ '../views/EditBookView.vue'),
    },
    {
        path: '/books/add',
        name: 'addBook',
        component: () =>
            import( /* webpackChunkName: "addBook" */ '../views/AddBookView.vue'),
    },
    {
        path: '/authors/edit/:id',
        name: 'editAuthor',
        component: () =>
            import( /* webpackChunkName: "editAuthor" */ '../views/EditAuthorView.vue'),
    },
    {
        path: '/authors/add',
        name: 'addAuthor',
        component: () =>
            import( /* webpackChunkName: "addAuthor" */ '../views/AddAuthorView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
