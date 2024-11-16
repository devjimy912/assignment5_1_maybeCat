

function AddData(){
    const [posts, setPosts] = useState([]);
    
    let newTitle = 'New Post';
    let newContent = 'Content of new post';
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
        setPosts([...posts, data]);
    })
    .catch(error => console.error('Error adding post:', error));
};

export default AddData;