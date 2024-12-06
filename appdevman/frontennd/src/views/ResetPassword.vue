<template>
    <div>
      <h1>Set New Password</h1>
      <form @submit.prevent="resetPassword">
        <div>
          <label for="password">New Password:</label>
          <input v-model="password" type="password" id="password" placeholder="Enter new password" required />
        </div>
        <button type="submit">Reset Password</button>
        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        password: '',
        message: null,
        error: null,
        token: this.$route.query.token, // Retrieve token from URL
      };
    },
    methods: {
      async resetPassword() {
        try {
          const response = await axios.post('http://localhost:5555/reset-password', {
            token: this.token,
            newPassword: this.password,
          });
          this.message = response.data.message;
        } catch (err) {
          this.error = err.response?.data?.message || 'Error resetting password.';
        }
      },
    },
  };
  </script>