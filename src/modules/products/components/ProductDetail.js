import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProducts] = useState([])

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/products/${id}`)
      setProducts(data.product)
    }

    getProduct()
  }, [id])

  return (
    <div>
      <h1>
        id: {product.id} Name: {product.name}
      </h1>
    </div>
  )
}
