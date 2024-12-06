<template>
    <div class="manage-users">
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Initial</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Degree Program</th>
            <th>Year Level</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Birthday</th>
            <th>Zip Code</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td><input v-model="user.firstname" /></td>
            <td><input v-model="user.m_initial" /></td>
            <td><input v-model="user.lastname" /></td>
            <td><input v-model="user.gender" /></td>
            <td><input v-model="user.degree_program" /></td>
            <td><input v-model="user.year_level" /></td>
            <td><input v-model="user.email" /></td>
            <td><input v-model="user.phone_number" /></td>
            <td><input v-model="user.student_status" /></td>
            <td><input v-model="user.birthday" type="date" /></td>
            <td><input v-model="user.zipcode" /></td>
            <td><input v-model="user.unit" /></td>
            <td>
              <button @click="updateUser(user)">Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:5555/admin/users');
          this.users = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async updateUser(user) {
        try {
          await axios.put(`http://localhost:5555/admin/user/${user.id}`, user);
          alert('User updated successfully.');
        } catch (error) {
          console.error('Error updating user:', error);
          alert('Failed to update user.');
        }
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style>
  .manage-users {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  table th {
    background-color: #f4f4f4;
  }
  
  input {
    width: 90%;
    padding: 5px;
    margin: 2px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  