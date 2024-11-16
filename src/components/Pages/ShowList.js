import React, { useEffect, useState } from 'react';

function ShowList() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewTitle('');
        setNewContent('');
    };

    const handleAddPost = () => {
        const newPost = { name: newTitle, occupation: newContent };

        fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
        .then(response => response.json())
        .then(data => {
            setPosts(prevPosts => [...prevPosts, data]);
            closeModal();
        })
        .catch(error => console.error('Error adding post:', error));
    };

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
            <button onClick={openModal}>Add Post</button>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    zIndex: 1000
                }}>
                <h2>Add a New Post</h2>
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                    />
                </label>
                <br />
                <label>
                    Content:
                    <input 
                        type="text" 
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)} 
                    />
                    </label>
                    <br />
                    <button onClick={handleAddPost}>Submit</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            )}

            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.name}</h2>
                        <p>{post.occupation}</p>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShowList;
