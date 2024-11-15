import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://673589be5995834c8a9319d5.mockapi.io/api/db/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addPost = () => {
    let newTitle = 'New Post';
    let newContent = 'Content of new post';
    const newPost = { title: newTitle, content: newContent };

    fetch('https://673589be5995834c8a9319d5.mockapi.io/api/db/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, data]);
      })
      .catch(error => console.error('Error adding post:', error));
  };

  const deletePost = (id) => {
    fetch(`https://673589be5995834c8a9319d5.mockapi.io/api/db/posts/${id}`, {
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
      <button onClick={addPost}>Add Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;