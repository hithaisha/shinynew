import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb'
import data from '../../assets/data/listUser'
import Datatable from '../common/datatable'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import { getUsers } from '../api/user.api'
import { useState } from 'react'
import { useEffect } from 'react'

const List_user = () => {
  const [userResponses, setUserResponses] = useState({
    allData: [],
    gridData: [],
  })

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    const payload = {
      searchText: '',
    }
    getUsers(payload)
      .then((res) => {
        if (res) {
          console.log(res.data)
          const grid = res?.data?.map((user) => ({
            email: user?.email || '-',
            first_name: user?.firstName || '-',
            last_name: user?.lastName || '-',
            loyalty_rank: user?.loyaltyRank + ' Rank' || '-',
            display_name: user?.firstName + ' ' + user?.lastName || '-',
          }))
          setUserResponses({ allData: res?.data, gridData: grid })
        } else {
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            {/* <div className="btn-popup pull-right">
							<Link to="/users/create-user" className="btn btn-secondary">
								Create User
							</Link>
						</div> */}
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {userResponses.gridData.length > 0 ? (
                <Datatable
                  multiSelectOption={true}
                  myData={userResponses?.gridData}
                  pageSize={10}
                  pagination={true}
                  class="-striped -highlight"
                  deleteDisabled={true}
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

export default List_user
