<template>
    <div>
      <h1>Update Profile</h1>
      <form @submit.prevent="updateUserProfile">
        <div>
          <label for="firstname">First Name:</label>
          <input v-model="user.firstname" type="text" id="firstname" required />
        </div>
  
        <div>
          <label for="m_initial">Middle Initial:</label>
          <input v-model="user.m_initial" type="text" id="m_initial" maxlength="1" />
        </div>
  
        <div>
          <label for="lastname">Last Name:</label>
          <input v-model="user.lastname" type="text" id="lastname" required />
        </div>
  
        <div>
          <label for="gender">Gender:</label>
          <select v-model="user.gender" id="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
  
        <div>
          <label for="degree_program">Degree Program:</label>
          <select v-model="user.degree_program" id="degree_program" required>
            <option value="CAS">CAS</option>
            <option value="CBM">CBM</option>
            <option value="CCS">CCS</option>
            <option value="CCJE">CCJE</option>
            <option value="BSED">BSED</option>
            <option value="BTVTED">BTVTED</option>
          </select>
            
        </div>
  
        <div>
          <label for="year_level">Year Level:</label>
          <select v-model="user.year_level" id="year_level" required>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
  
        <div>
          <label for="phone_number">Phone Number:</label>
          <input v-model="user.phone_number" type="text" id="phone_number" required />
        </div>
  
        <div>
          <label for="student_status">Status:</label>
          <select v-model="user.student_status" id="student_status" required>
            <option value="Enrolled">Enrolled</option>
          </select>
        </div>
  
        <div>
          <label for="birthday">Birthday:</label>
          <input v-model="user.birthday" type="date" id="birthday" required />
        </div>
  
        <div>
          <label for="zipcode">Zip Code:</label>
          <input v-model="user.zipcode" type="text" id="zipcode" required />
        </div>
  
        <div>
          <label for="unit">Units:</label>
          <input v-model="user.unit" type="number" id="unit" required />
        </div>
  
        <button type="submit">Update Profile</button>
      </form>
      <br>
      <button type="button" @click="downloadPDF">Download Requirements PDF</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          firstname: '',
          m_initial: '',
          lastname: '',
          gender: '',
          degree_program: '',
          year_level: '',
          email: '',
          phone_number: '',
          student_status: '',
          birthday: '',
          zipcode: '',
          unit: ''
        },
        error: null,
      };
    },
    mounted() {
      this.loadUserProfile();
    },
    methods: {
      async loadUserProfile() {
        try {
          const response = await axios.get('http://localhost:5555/userprofile', { withCredentials: true });
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error.response ? error.response.data : error);
          this.error = 'Failed to load profile data.';
        }
      },
      downloadPDF() {
      const pdfUrl = '/adv1.pdf';  // Path to the PDF file in the public folder

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'adv1.pdf';  // The name of the downloaded file
      link.click();  // Trigger the click event to start the download
    },
      async updateUserProfile() {
        try {
          const response = await axios.put('http://localhost:5555/updateprofile', this.user, { withCredentials: true });
          alert('Profile updated successfully');
          this.$router.push('/userprofile');
        } catch (error) {
          console.error('Error updating profile:', error.response ? error.response.data : error);
          this.error = 'Failed to update profile. Please try again.';
        }
      },
      
      
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #4CAF50;
  }
  form div {
    margin-bottom: 15px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  </style>
  