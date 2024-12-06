<template>
  <div>
    <header>
      <h1>Admin Dashboard</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/admin">Admin Dashboard</a>
        <button @click="logout">Logout</button>
      </nav>
    </header>

    <main>
      <form @submit.prevent="createPost">
        <h2>Create a New Post</h2>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    async createPost() {
      try {
        const response = await axios.post(
          'http://localhost:5555/admin/create-post',
          { title: this.title, content: this.content },
          { withCredentials: true }
        );
        if (response.status === 201) {
          alert('Post created successfully!');
          this.title = '';
          this.content = '';
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post.');
      }
    },
    async logout() {
      try {
        const response = await axios.get('http://localhost:5555/logout', { withCredentials: true });
        if (response.status === 200) {
          this.$router.push('/'); // Redirect to the login page
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

form {
  max-width: 500px;
  margin: auto;
}

form div {
  margin-bottom: 15px;
}

form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

form input,
form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

form button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}
</style>
