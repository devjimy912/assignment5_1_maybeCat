import React, { useEffect, useState, useCallback } from 'react';
import './Modal.css';

function ShowList() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);

  const openModal = useCallback((post = null) => {
    if (post) {
      setFormData({
        name: post.name,
        email: post.email,
        age: post.age,
        occupation: post.occupation,
      });
      setEditId(post.id);
    } else {
      setFormData({ name: '', email: '', age: '', occupation: '' });
      setEditId(null);
    }
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', age: '', occupation: '' });
    setEditId(null);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSavePost = async () => {
    if (editId) {
      try {
        const response = await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === editId ? updatedPost : post))
        );
        closeModal();
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      try {
        const response = await fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const newPost = await response.json();
        setPosts((prevPosts) => [...prevPosts, newPost]);
        closeModal();
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  const deletePost = useCallback(async (id) => {
    try {
      await fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={() => openModal()}>Add Post</button>

      {isModalOpen && (
        <div id="Modal">
          <h2>{editId ? 'Edit Post' : 'Add a New Post'}</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Occupation:
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button onClick={handleSavePost}>
            {editId ? 'Update' : 'Submit'}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>Age: {post.age}</p>
            <p>Email: {post.email}</p>
            <p>Occupation: {post.occupation}</p>
            <button onClick={() => openModal(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
