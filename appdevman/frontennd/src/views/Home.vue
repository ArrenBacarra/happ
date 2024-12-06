<template>
  <header>
    <h1>Welcome to the Homepage</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/apply">Apply</a>
      <a href="/userprofile">Profile</a>
      <!-- Conditionally render Admin link -->
      <a v-if="isAdmin" href="/manage-users">Manage Users</a>
      <button @click="logout">Logout</button>
    </nav>
  </header>

  <main>
    <p>This is the homepage. Feel free to explore!</p>

    <!-- Display the posts -->
    <div v-if="posts.length > 0">
      <h2>Admin's Posts</h2>
      <div v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <p><small>By: {{ post.creator_name }} | Created on: {{ post.created_at }}</small></p>
      </div>
    </div>
    <div v-else>
      <p>No posts available yet.</p>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [], // Store posts here
      isAdmin: false, // Store admin status here
    };
  },
  created() {
    this.fetchPosts();
    this.checkAdminStatus();  // Check if the user is an admin
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:5555/api/admin/posts');
        this.posts = response.data; // Assign fetched posts to posts array
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async checkAdminStatus() {
      try {
        const response = await axios.get('http://localhost:5555/api/check-role', { withCredentials: true });
        if (response.data.role === 'admin') {
          this.isAdmin = true; // Set isAdmin to true if the user is an admin
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    },
    async logout() {
      try {
        const response = await axios.get('http://localhost:5555/logout', { withCredentials: true });
        if (response.status === 200) {
          this.$router.push('/'); // Redirect to the login page after logout
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
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

.post-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.post-item h3 {
  margin-top: 0;
}

.post-item p {
  color: #555;
}

.post-item small {
  color: #888;
}
</style>
