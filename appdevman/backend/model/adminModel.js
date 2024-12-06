const db = require('../config/db');

const adminModel = {
  // Function to create a post
  createPost: (postData, callback) => {
    const { title, content, creatorId } = postData;
    const query = `INSERT INTO posts (title, content, creator_id) VALUES (?, ?, ?)`;
    db.query(query, [title, content, creatorId], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  fetchPosts: (callback) => {
    const query = `
      SELECT posts.id, posts.title, posts.content, posts.created_at,
             CONCAT(users.firstname, ' ', users.lastname) AS creator_name
      FROM posts
      JOIN users ON posts.creator_id = users.id
      ORDER BY posts.created_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = adminModel;
