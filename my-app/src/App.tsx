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

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.log('Error fetching posts:', error))
  }, []);

  return (
    <div className='container'>
      <h1>Posts</h1>
      <div className='posts-wrapper'>
        {posts.map(post => (
          <div key={post.id} className='post-card'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
