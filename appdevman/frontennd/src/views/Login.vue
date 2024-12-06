<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          class="form-control"
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          class="form-control"
          v-model="password"
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <div class="col-12 mt-2">
        <p class="text-secondary text-center">
          Don't have an account?
          <router-link to="/register" class="link-primary text-decoration-none">
            Register
          </router-link>
        </p>
        <p>
          Forgot your password? 
          <router-link to="/reset-password-request" class="link-primary text-decoration-none">
            Reset it here
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    async loginUser() {
      this.error = null;

      if (!this.email.includes('@')) {
        this.error = 'Please enter a valid email address.';
        return;
      }
      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters.';
        return;
      }

      this.loading = true;

      try {
        const response = await axios.post(
          'http://localhost:5555/login',  // Backend URL for login
          { email: this.email, password: this.password },
          { withCredentials: true }  // If using cookies/sessions
        );

        if (response.status === 200) {
          // Check the role in the response
          const role = response.data.role;
          if (role === 'admin') {
            this.$router.push('/admin-dashboard');  // Redirect to Admin Dashboard
          } else if (role === 'student') {
            this.$router.push('/home');  // Redirect to Student Dashboard
          }
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed. Try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
