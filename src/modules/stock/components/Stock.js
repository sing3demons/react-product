/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import Moment from 'react-moment'
import MaterialTable, { MTableToolbar } from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { DeleteOutline, Edit } from '@material-ui/icons'
import * as tableIcon from './tableIcons'
import { loadProducts } from 'modules/products/actions'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const tableIcons = tableIcon

const useStyles = makeStyles((theme) => ({
  root: {
    width: '700',
    marginTop: 0,
  },
}))

export default function Stock(props) {
  const { items, paging } = useSelector((state) => state.products)
  const history = useHistory()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { token } = JSON.parse(localStorage.getItem('token'))

  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClickOpen = (item) => {
    setSelectedItem(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const showDeletionConfirmDlg = () => {
    return selectedItem ? (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this item Id : {selectedItem.id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img
                src={`${selectedItem.image}`}
                style={{ width: 50, height: 50, borderRadius: '5%' }}
              />
              <span style={{ marginLeft: 20 }}>{selectedItem.name}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                await axios.delete(`/products/${selectedItem.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                addToast('success', { appearance: 'success' })
                handleClose()
              } catch (error) {
                addToast('error', { appearance: 'error' })
                handleClose()
              }
            }}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ) : null
  }

  useEffect(() => {
    dispatch(loadProducts(`?limit=${paging.count}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: 'Id',
      field: 'id',
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },
    {
      title: 'Image',
      cellStyle: { padding: 0 },
      render: (item) => (
        <img
          src={`${item.image}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: '5%' }}
        />
      ),
    },
    {
      title: 'Name',
      field: 'name',
      cellStyle: { minWidth: 100 },
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },

    {
      title: 'Price',
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'฿'}
          />
        </Typography>
      ),
    },
    {
      title: 'Desc',
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.desc}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={' pcs'}
          />
        </Typography>
      ),
    },
    {
      title: 'Updated',
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ]

  const actions = [
    {
      icon: () => <Edit />,
      iconProps: { color: 'primary' },
      tooltip: 'Edit',
      onClick: (event, rowData) => {
        history.push(`/stock/edit/${rowData.id}`)
      },
    },
    {
      icon: () => <DeleteOutline />,
      iconProps: { color: 'action' },
      tooltip: 'Delete',
      onClick: (event, rowData) => {
        handleClickOpen(rowData)
      },
    },
  ]
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MaterialTable
        options={{
          search: true,
          pageSize: 5,
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 === 0 ? '#f8faf9' : '#fff',
          }),
        }}
        icons={tableIcons.TableIcon}
        columns={columns}
        data={items}
        title="Stock"
        actions={actions}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stock/create"
                >
                  Create
                </Button>
              </div>
            </div>
          ),
        }}
      />
      {showDeletionConfirmDlg()}
    </div>
  )
}
