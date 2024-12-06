const adminModel = require('../model/adminModel');

const adminController = {
  // Controller function to create a post
  createPost: (req, res) => {
    const { title, content } = req.body;
    const creatorId = req.session.userId; // Assuming logged-in admin's ID is stored in session
    
    if (!creatorId) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const postData = { title, content, creatorId };

    adminModel.createPost(postData, (err, result) => {
      if (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({ message: 'Error creating post' });
      }

      res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    });
  },

// Fetch all posts
  fetchPosts: (req, res) => {
    adminModel.fetchPosts((err, results) => {
      if (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).json({ message: 'Error fetching posts' });
      }
      res.status(200).json(results);
    });
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: [
          'firstname',
          'm_initial',
          'lastname',
          'gender',
          'degree_program',
          'year_level',
          'email',
          'phone_number',
          'student_status',
          'birthday',
          'zipcode',
          'unit',
        ],
        where: {
          role: 'student',
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users.' });
    }
  },
  
  // Update user data
  updateUser: async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      await user.update(updatedData);
      res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user.' });
    }

}
}

module.exports = adminController;
