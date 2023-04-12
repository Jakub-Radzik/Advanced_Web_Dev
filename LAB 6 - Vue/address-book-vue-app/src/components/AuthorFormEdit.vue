<template>
    <div id="author-form-edit">
        <form @submit.prevent="handleSubmit">
            <label>Name</label>
            <input
                v-model="author.name"
                type="text"
                :class="{ 'has-error': submitting && invalidName }"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <label>Surname</label>
            <input
                v-model="author.surname"
                type="text"
                :class="{ 'has-error': submitting && invalidSurname }"
                @focus="clearStatus"
                @keypress="clearStatus"
            />
            <p v-if="error && submitting" class="error-message">
                Please fill in the required fields
            </p>
            <p v-if="success && !error" class="success-message">
                Author updated successfully
            </p>

            <button>Update author</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'author-form-edit',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            author: {
                name: '',
                surname: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()
            //check form fields
            if (this.invalidName || this.invalidSurname) {
                this.error = true
                return
            }
            //send data to server
            fetch('http://localhost:8008/author/authors/' + this.$route.params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.author),
            })
                .then(response => {
                    console.log(response.json())
                    if (response.status === 404) {
                        this.error = true
                        this.success = false
                    } else {
                        this.success = true
                        this.error = false
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.error = true
                    this.success = false
                })
            //clear form fields
            this.author = {
                name: '',
                surname: '',
            }
            this.submitting = false
        },
        clearStatus() {
            this.success = false
            this.error = false
        },
    },
    computed: {
        invalidName() {
            return this.author.name === ''
        },
        invalidSurname() {
            return this.author.surname === ''
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
