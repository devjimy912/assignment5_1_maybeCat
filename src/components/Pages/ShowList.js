import React, { useEffect, useState } from 'react';
import './Modal.css'

function ShowList() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newOccupation, setNewOccupation] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAge, setNewAge] = useState('');

    useEffect(() => {
        fetch('https://6735a7195995834c8a9389c1.mockapi.io/api/v1/posts')
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewName('');
        setNewOccupation('');
    };

    const handleAddPost = () => {
        const newPost = { name: newName, occupation: newOccupation };

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
                <div id="Modal">
                <h2>Add a New Post</h2>
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={newEmail} 
                        onChange={(e) => setNewEmail(e.target.value)} 
                    />
                </label>
                <br />
                <label>
                    Age:
                    <input 
                        type="number" 
                        value={newAge} 
                        onChange={(e) => setNewAge(e.target.value)} 
                    />
                </label>
                <br />
                <label>
                    Occupation:
                    <input 
                        type="text" 
                        value={newOccupation} 
                        onChange={(e) => setNewOccupation(e.target.value)} 
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
                        <p>{post.age}</p>
                        <p>{post.email}</p>
                        <p>{post.occupation}</p>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShowList;
