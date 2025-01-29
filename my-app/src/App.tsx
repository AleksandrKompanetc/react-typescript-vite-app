import { useState } from 'react'
import './App.css'

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {

  return (
    <div className='container'>
      <h1>Posts</h1>
      <div className='posts-wrapper'></div>
    </div>
  )
}

export default App
