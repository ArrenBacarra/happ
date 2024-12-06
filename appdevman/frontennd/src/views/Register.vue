<template>
    <section class="bg-light py-3 py-md-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card border border-light-subtle rounded-3 shadow-sm">
                        <div class="card-body p-3 p-md-4 p-xl-5">
                            <div class="text-center mb-3">
                                <i class="bi bi-person-plus" style="font-size: 4rem; color: #007bff;"></i>
                            </div>
                            <h2 class="fs-6 fw-normal text-center text-secondary mb-4">Create a new account</h2>

                            <!-- Display error message if exists -->
                            <div v-if="error" class="alert alert-danger" role="alert">
                                {{ error }}
                            </div>

                            <!-- Registration form -->
                            <form @submit.prevent="handleSubmit">
                                <div class="row gy-2 overflow-hidden">
                        
                                    <!-- Email Field -->
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input 
                                                type="email" 
                                                class="form-control" 
                                                v-model="email" 
                                                id="email" 
                                                placeholder="name@example.com" 
                                                required
                                            />
                                            <label for="email" class="form-label">Email</label>
                                        </div>
                                    </div>

                                    <!-- Password Field -->
                                    <div class="col-12">
                                        <div class="form-floating mb-3">
                                            <input 
                                                type="password" 
                                                class="form-control" 
                                                v-model="password" 
                                                id="password" 
                                                placeholder="Password" 
                                                required
                                            />
                                            <label for="password" class="form-label">Password</label>
                                        </div>
                                    </div>

                                    <!-- Submit Button -->
                                    <div class="col-12">
                                        <div class="d-grid my-3">
                                            <button class="btn btn-primary btn-lg" type="submit">Sign Up</button>
                                        </div>
                                    </div>

                                    <!-- Already have an account -->
                                    <div class="col-12">
                                        <p class="m-0 text-secondary text-center">
                                            Already have an account? 
                                            <router-link to="/" class="link-primary text-decoration-none">Log in</router-link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "RegisterComponent",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        async handleSubmit() {
    this.error = null; // Clear previous errors
    try {
        // Send the form data to the server
        const response = await axios.post('http://localhost:5555/register', {
            name: this.name,
            email: this.email,
            password: this.password
        });

        // If registration was successful, show success message or redirect
        if (response.status === 200) {
            this.$router.push("/"); // Redirect to login page
        }

    } catch (err) {
        // Handle error responses from the server
        if (err.response && err.response.data.message) {
            this.error = err.response.data.message || 'Registration failed. Please try again.';
        } else {
            this.error = 'An error occurred. Please try again later.';
        }
    }
}
    }
};
</script>

<style scoped>
.bg-light {
    padding: 60px 0;
}

.card {
    border: none;
    border-radius: 12px;
    background-color: #ffffff;
}

.fs-6 {
    font-size: 1.1rem;
    color: #333333;
    text-align: center;
}

.form-control {
    border-radius: 8px;
    border: 1px solid #ced4da;
}

.form-control:focus {
    box-shadow: none;
    border-color: #007bff;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.link-primary {
    color: #007bff;
    font-weight: bold;
    text-decoration: none;
}

.link-primary:hover {
    color: #0056b3;
    text-decoration: underline;
}
</style>
