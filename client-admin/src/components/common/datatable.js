import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Datatable = ({
  myData,
  myClass,
  multiSelectOption,
  pagination,
  handleDelete,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [checkedValues, setCheckedValues] = useState([])
  const [data, setData] = useState(myData)
  const selectRow = (e, i) => {
    if (!e.target.checked) {
      setCheckedValues(checkedValues.filter((item, j) => i !== item))
    } else {
      checkedValues.push(i)
      setCheckedValues(checkedValues)
    }
  }

  const handleRemoveRow = () => {
    const updatedData = myData.filter(function (el) {
      return checkedValues.indexOf(el.id) < 0
    })
    setData([...updatedData])
    toast.success('Successfully Deleted !')
  }

  const renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML
          setData({ myData: data })
        }}
        dangerouslySetInnerHTML={{
          __html: myData[cellInfo.index][cellInfo.index.id],
        }}
      />
    )
  }

  const handleDeleteConfirm = (iId) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      handleDelete(iId)
    }
  }

  const onOpenModal = (dt) => {
    // setOpen(true);
    navigate(`/items/item-settings/${dt.id}`)
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const columns = []
  for (const key in myData[0]) {
    let editable = renderEditable
    if (key === 'image') {
      editable = null
    }
    if (key === 'status') {
      editable = null
    }
    if (key === 'avtar') {
      editable = null
    }
    if (key === 'vendor') {
      editable = null
    }
    if (key === 'order_status') {
      editable = null
    }

    const loyaltyRankColors = {
      Gold: 'gold',
      Silver: 'silver',
      Bronze: 'bronze',
      Basic: 'red',
    }

    columns.push({
      name: <b>{Capitalize(key.toString())}</b>,
      header: <b>{Capitalize(key.toString())}</b>,
      selector: (row) => row[key],
      Cell: editable,
      style: {
        textAlign: 'center',
        color: key === 'loyalty_rank' ? 'blue' : 'black',
        fontWeight: key === 'loyalty_rank' && 900,
      },
    })
  }

  if (multiSelectOption === true) {
  } else {
    columns.push({
      name: <b>Action</b>,
      id: 'delete',
      accessor: (str) => 'delete',
      cell: (row, index) => (
        <div>
          <span onClick={() => handleDeleteConfirm(row.id)}>
            <i
              className="fa fa-trash"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: '#e4566e',
              }}
            ></i>
          </span>

          <span>
            <i
              onClick={() => onOpenModal(row)}
              className="fa fa-pencil"
              style={{
                width: 35,
                fontSize: 20,
                padding: 11,
                color: 'rgb(40, 167, 69)',
              }}
            ></i>
            {/* <Modal
							isOpen={open}
							toggle={onCloseModal}
							style={{ overlay: { opacity: 0.1 } }}
						>
							<ModalHeader toggle={onCloseModal}>
								<h5 className="modal-title f-w-600" id="exampleModalLabel2">
									Edit Product
								</h5>
							</ModalHeader>
							<ModalBody>
								<Form>
									<FormGroup>
										<Label htmlFor="recipient-name" className="col-form-label">
											Category Name :
										</Label>
										<Input type="text" className="form-control" />
									</FormGroup>
									<FormGroup>
										<Label htmlFor="message-text" className="col-form-label">
											Category Image :
										</Label>
										<Input
											className="form-control"
											id="validationCustom02"
											type="file"
										/>
									</FormGroup>
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									type="button"
									color="primary"
									onClick={() => onCloseModal("VaryingMdo")}
								>
									Update
								</Button>
								<Button
									type="button"
									color="secondary"
									onClick={() => onCloseModal("VaryingMdo")}
								>
									Close
								</Button>
							</ModalFooter>
						</Modal> */}
          </span>
        </div>
      ),
      style: {
        textAlign: 'center',
      },
      sortable: false,
    })
  }

  return (
    <div>
      <Fragment>
        <DataTable
          data={data}
          columns={columns}
          className={myClass}
          pagination={pagination}
          striped={true}
          center={true}
        />

        <ToastContainer />
      </Fragment>
    </div>
  )
}

export default Datatable
