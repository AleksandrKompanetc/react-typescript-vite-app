import { useState, useEffect } from 'react'
import './App.css'

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')
  const [newTitle, setNewTitle] = useState<string>('')
  const [newBody, setNewBody] = useState<string>('')

  const fetchPosts = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      setPosts(data)
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching posts:', error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  const handleAddPost = () => {
    if (newTitle.trim() && newBody.trim()) {
      const newPost:Post = {
        id: posts.length + 1,
        title: newTitle,
        body: newBody,
      };
      setPosts([newPost, ...posts]);
      setNewTitle('');
      setNewBody('');
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container'>
      <h1>Posts</h1>
      <input 
        type="text" 
        placeholder='Searching posts...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='search-input'
      />
      <button onClick={fetchPosts} className='reload-button'>Reload</button>

      <div className='add-post-form'>
        <h2>Add Post</h2>
        <input 
          type="text" 
          placeholder='Title'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className='add-post-input'
        />
        <textarea 
          placeholder='Post Text'
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          className='add-post-text'
        />
        <button onClick={handleAddPost} className='add-button'>Add</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className='posts-wrapper'>
        {filteredPosts.map(post => (
          <div key={post.id} className='post-card'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={handleDeletePost(post.id)} className='delete-button'>Delete</button>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default App
