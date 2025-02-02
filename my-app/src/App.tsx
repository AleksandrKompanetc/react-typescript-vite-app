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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const postsPerPage = 9;

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
      setLoading(false)
    } else {
      fetchPosts()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const fetchPosts = () => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.slice(0, 9))
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
      const newPost: Post = {
        id: posts.length + 1,
        title: newTitle,
        body: newBody,
      };
      setPosts([newPost, ...posts]);
      setNewTitle('');
      setNewBody('');
    }
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(0, currentPage * postsPerPage)

  return (
    <div className='container'>
      <h1>Posts</h1>
      <button onClick={() => setDarkMode(!darkMode)} className='theme-toggle'>
        {darkMode ? 'Light theme' : 'Dark theme'}
      </button>
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
        <>
          <div className='posts-wrapper'>
            {filteredPosts.map(post => (
              <div key={post.id} className='post-card'>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => handleDeletePost(post.id)} className='delete-button'>Delete</button>
              </div>
            ))}
          </div>
          <div className='pagination'>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Back
            </button>
            <span>Page {currentPage} from {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            className='load-more-button'
          >
            Load more posts
          </button>
        </>
      )}
    </div>
  )
}

export default App
