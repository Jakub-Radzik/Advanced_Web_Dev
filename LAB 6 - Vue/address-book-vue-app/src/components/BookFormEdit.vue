<template>
    <div id="book-form">
        <form @submit.prevent="handleSubmit">
            <label>Title</label>
            <input
                v-model="book.title"
                type="text"
                :class="{ 'has-error': submitting && invalidTitle }"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <label>Author</label>
            <input
                v-model="book.author"
                type="number"
                :class="{ 'has-error': submitting && invalidAuthor }"
                @focus="clearStatus"
            />
            <label>Pages</label>
            <input
                v-model="book.pages"
                type="number"
                :class="{ 'has-error': submitting && invalidPages }"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <label>Borrowed</label>
            <input
                v-model="book.borrowed"
                type="checkbox"
                :class="{ 'has-error': submitting && invalidPages }"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <p v-if="error && submitting" class="error-message">
                Please fill in the required fields
            </p>
            <p v-if="success" class="success-message">
                Book changed successfully
            </p>
            <p v-if="error && !submitting && !success" class="error-message">
                Author not found
            </p>
            <br />
            <button>Update book</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'book-form-edit',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            book: {
                title: '',
                author: '',
                pages: '',
                borrowed: false,
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()
            //check form fields
            if (this.invalidName || this.invalidAuthor || this.invalidPages) {
                this.error = true
                return
            }
            //send data to server
            fetch('http://localhost:8008/book_service/books', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.$route.params.id,
                    title: this.book.title,
                    author: this.book.author,
                    pages: this.book.pages,
                    is_borrowed: this.book.borrowed,
                }),
            })
                .then(response => {
                    console.log(response.json())
                    this.success = true
                    this.error = false
                })
                .catch(error => {
                    console.log(error)
                    this.error = true
                    this.success = false
                })
            //clear form fields
            this.book = {
                title: '',
                author: '',
                pages: '',
                borrowed: false,
            }
            this.submitting = false
        },
        clearStatus() {
            this.success = false
            this.error = false
        },
    },
    computed: {
        invalidTitle() {
            return this.book.title === ''
        },
        invalidAuthor() {
            return this.book.author === ''
        },
        invalidPages() {
            return this.book.pages === ''
        },
    },
}
</script>

<style scoped>
form {
    margin-bottom: 2rem;
}
[class*='-message'] {
    font-weight: 500;
}
.error-message {
    color: #d33c40;
}
.success-message {
    color: #32a95d;
}
</style>
