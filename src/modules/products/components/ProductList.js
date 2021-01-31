import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ProductList() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchPosts = async () => {
    setIsLoading(true)
    const { data } = await axios.get('/products?limit=30')
    setPosts(data.products.items)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (isLoading) return <div>Loading...</div> //show Loading...
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Products</h1>
      <ul>
        {posts.map((post) => (
          <li style={{ display: 'flex' }} key={post.id}>
            {post.id} {post.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
