import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb'
import data from '../../assets/data/listUser'
import Datatable from '../common/datatable'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import { deleteItem, getItems } from '../api/item.api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const List_item = () => {
  const [itemResponses, setItemResponses] = useState({
    allData: [],
    gridData: [],
  })

  useEffect(() => {
    getAllItems()
  }, [])

  const getAllItems = () => {
    const payload = {
      searchText: '',
      categoryId: 0,
    }
    getItems(payload)
      .then((res) => {
        if (res) {
          const grid = res?.data?.map((item) => ({
            id: item?.id,
            image: (
              <img
                alt=""
                src={item?.itemImageUrl}
                style={{ width: 50, height: 50 }}
              />
            ),
            name: item?.itemName,
            category_name: item?.categoryName,
            item_code: item?.itemCode,
            quantity: item?.quantity,
            price: `LKR ${item?.price}`,
          }))
          setItemResponses({ allData: res?.data, gridData: grid })
        } else {
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleDelete = (iId) => {
    deleteItem(iId)
      .then((res) => {
        if (res?.data?.succeeded) {
          toast.success('Successfully Deleted')
          setTimeout(() => {
            window.location.reload()
            getAllItems()
          }, 1500)
        } else {
          toast.error('Error Occured. Try again')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Fragment>
      <ToastContainer />
      <Breadcrumb title="Item List" parent="Items" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Item Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link
                to={`/items/item-settings/new`}
                className="btn btn-secondary"
              >
                Create Item
              </Link>
            </div>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {itemResponses.gridData.length > 0 ? (
                <Datatable
                  multiSelectOption={false}
                  myData={itemResponses?.gridData}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                  striped={true}
                  handleDelete={handleDelete}
                  center={true}
                />
              ) : (
                <p>Loading data...</p>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  )
}

export default List_item
