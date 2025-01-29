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
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className='posts-wrapper'>
        {posts.map(post => (
          <div key={post.id} className='post-card'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default App
