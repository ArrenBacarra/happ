<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="user">
      <p><strong>First Name:</strong> {{ user.firstname }}</p>
      <p><strong>Middle Initial:</strong> {{ user.m_initial }}</p>
      <p><strong>Last Name:</strong> {{ user.lastname }}</p>
      <p><strong>Gender:</strong> {{ user.gender }}</p>
      <p><strong>Degree Program:</strong> {{ user.degree_program }}</p>
      <p><strong>Year Level:</strong> {{ user.year_level }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone Number:</strong> {{ user.phone_number }}</p>
      <p><strong>Status:</strong> {{ user.student_status }}</p>
      <p><strong>Birthday:</strong> {{ user.birthday }}</p>
      <p><strong>Zip Code:</strong> {{ user.zipcode }}</p>
      <p><strong>No. of Units:</strong> {{ user.unit }}</p>
      <button @click="goToUpdateProfile">Edit Profile</button>
    </div>
    <div v-else>
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      axios.get('http://localhost:5555/userprofile', { withCredentials: true })
        .then(response => {
          this.user = response.data;
          console.log('User profile:', this.user);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error.response ? error.response.data : error);
          if (error.response && error.response.status === 401) {
            alert('Unauthorized access. Please log in.');
            this.$router.push('/');
          }
        });
    },
    goToUpdateProfile() {
    this.$router.push('/updateprofile');
  }
  },
};
</script>

<style scoped>
h1 {
  color: #4CAF50;
}
p {
  font-size: 16px;
}
button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: #45a049;
}
</style>
