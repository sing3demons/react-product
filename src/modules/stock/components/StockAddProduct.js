import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CardActions,
  Card,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    flex: 1,
  },
}))

export default function StockAddProduct() {
  const classes = useStyles()
  const { token } = JSON.parse(localStorage.getItem('token'))
  const { addToast } = useToasts()
  const [image, setImage] = useState({ preview: '', raw: '' })

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    desc: yup.string().required(),
    price: yup.number().positive().integer().required(),
    categoryId: yup.number().required(),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submit = async (product) => {
    try {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('desc', product.desc)
      formData.append('price', product.price)
      formData.append('categoryId', product.categoryId)
      formData.append('image', product.image[0])

      await axios.post('/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      addToast('success', { appearance: 'success' })
    } catch (error) {
      addToast(`error ${error.response.data.error}`, { appearance: 'error' })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <Card>
          <CardContent className={classes.form}>
            <Typography variant="h5" component="h2">
              Add Product
            </Typography>
            <TextField
              name="name"
              inputRef={register}
              variant="outlined"
              label="Name"
              placeholder="Enter your name"
              fullWidth
              helperText={errors.name?.message || ''}
              error={!!errors.name}
            />

            <TextField
              inputRef={register}
              variant="outlined"
              label="Desc"
              placeholder="Enter your Description"
              name="desc"
              fullWidth
              helperText={errors.desc?.message || ''}
              error={!!errors.desc}
            />

            <TextField
              inputRef={register}
              variant="outlined"
              label="Price"
              placeholder="Enter your price"
              name="price"
              fullWidth
              helperText={errors.price?.message || ''}
              error={!!errors.price}
            />
            {/* <input type="number" name="price" ref={register} />
          <input type="number" name="categoryId" ref={register} /> */}
            <TextField
              inputRef={register}
              variant="outlined"
              label="CategoryID"
              placeholder="Enter your ID"
              name="categoryId"
              fullWidth
              helperText={errors.categoryId?.message || ''}
              error={!!errors.categoryId}
            />

            {image.preview ? (
              <img src={image.preview} alt="dummy" width="300" height="300" />
            ) : (
              <>
                <span className="fa-stack fa-2x mt-3 mb-2">
                  <i className="fas fa-circle fa-stack-2x" />
                  <i className="fas fa-store fa-stack-1x fa-inverse" />
                </span>
                <h5 className="text-center">Upload your photo</h5>
              </>
            )}

            <input
              type="file"
              name="image"
              onChange={handleChange}
              ref={register({
                required: 'กรุณาเลือกไฟล์ภาพก่อน',
                validate: {
                  checkFileType: (value) => {},
                },
              })}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  )
}
