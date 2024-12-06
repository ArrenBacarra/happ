<template>
    <div>
    <h1>Reset Password</h1>
    <form @submit.prevent="requestReset">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
      </div>
      <button type="submit">Request Reset</button>
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
      email: '',
      message: null,
      error: null,
    };
  },
  methods: {
    async requestReset() {
      try {
        const response = await axios.post('http://localhost:5555/reset-password-request', {
          email: this.email,
        });
        this.message = response.data.message;
      } catch (err) {
        this.error = err.response?.data?.message || 'Error requesting reset.';
      }
    },
  },
};

</script>