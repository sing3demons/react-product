import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PostList() {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const { data } = await axios.get('http://localhost:8080/api/v2/products')

      setPosts(data.products.items)
    }
    fetchPosts()
    setIsLoading(false) //show Loading...
  }, [])

  if (isLoading) return <div>Loading...</div> //show Loading...

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.id}, {post.name}, {post.desc}
        </li>
      ))}
    </ul>
  )
}
