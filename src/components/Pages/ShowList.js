import React, { useEffect, useState } from 'react';
import AddData from "./AddData";
import EditData from "./EditData";


function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deletePost = (id) => {
    fetch(`https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={<AddData />}>Add Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>{post.occupation}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button onClick={<EditData />}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
