import React, { Fragment, useEffect, useState } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Dropzone from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify'
import { getCategories } from '../api/master.data.api'
import { itemCategories } from '../../assets/data/itemCategories'
import { createItem, getItemById } from '../api/item.api'
import { useParams, useNavigate } from 'react-router-dom'

const TabsetItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showInWeb, setShowInWeb] = useState('true')
  const [showInFront, setShowInFront] = useState('true')
  const [itemPic, setItemPic] = useState(
    'https://res.cloudinary.com/dkqu8p3rs/image/upload/v1721452390/Scanner/olfsei57cdk9ykkavgdv.png',
  )
  const [previewImage, setPreviewImage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: '' })
  const [categories, setCategories] = useState([])
  const [isDropdownLoading, setIsDropdownLoading] = useState(true)
  const [itemDetails, setItemDetails] = useState(null)
  const [defVals, setDefVals] = useState({
    itemName: '',
    itemCode: '',
    quantity: 0,
    price: 0,
    shortDescription: '',
    longDescription: '',
    latitude: 0,
    longitude: 0,
    skuCode: '',
    loyaltyPoints: 0,
    categoryId: 0,
    itemImageUrl: '',
  })
  const [editDefVals, setEditDefVals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   const watchID = navigator.geolocation.watchPosition(
  //     (position) => {
  //       var lat = position.coords.latitude
  //       var long = position.coords.longitude
  //       setLatitude(lat)
  //       setLongitude(long)
  //       console.log('Latitude: ' + lat)
  //       console.log('Longitude: ' + long)
  //     },
  //     (error) => {
  //       console.error('Error getting geolocation:', error)
  //       setError('Error getting geolocation: ' + error.message)
  //     },
  //   )

  //   // Clear the watch when the component unmounts
  //   return () => {
  //     navigator.geolocation.clearWatch(watchID)
  //   }
  // }, [])
  useEffect(() => {
    // Function to get the geolocation and update state
    const updateGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const long = position.coords.longitude
          setLatitude(lat)
          setLongitude(long)
          console.log('Latitude: ' + lat)
          console.log('Longitude: ' + long)
        },
        (error) => {
          console.error('Error getting geolocation:', error)
          setError('Error getting geolocation: ' + error.message)
        },
      )
    }

    // Initial geolocation request
    updateGeolocation()

    // Set up interval to refresh every second
    const intervalId = setInterval(updateGeolocation, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (id !== 'new') {
      getItemById(id)
        .then((res) => {
          if (res) {
            setItemDetails(res?.data)
            setEditDefVals({
              itemName: res?.data?.itemName,
              itemCode: res?.data?.itemCode,
              quantity: res?.data?.quantity,
              price: res?.data?.price,
              shortDescription: res?.data?.shortDescription,
              longDescription: res?.data?.longDescription,
              latitude: res?.data?.latitude,
              longitude: res?.data?.longitude,
              skuCode: res?.data?.skuCode,
              loyaltyPoints: res?.data?.loyaltyPoints,
              categoryId: res?.data?.categoryId,
              itemImageUrl: res?.data?.itemImageUrl,
            })
            setPreviewImage(res?.data?.itemImageUrl)
            setItemPic(res?.data?.itemImageUrl)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    const getCats = async () => {
      try {
        const data = await getCategories()
        setCategories(data)

        setIsDropdownLoading(false)
      } catch (error) {
        console.log(error)
        setCategories([])
        setIsDropdownLoading(false)
      }
    }
    getCats()
  }, [])

  useEffect(() => {
    if (id !== 'new') {
      if (itemDetails?.categoryId) {
        setSelectedCategory(
          itemCategories?.find((e) => e.id === itemDetails?.categoryId),
        )
      }
    }
  }, [categories, itemDetails, id])

  const validationSchema = Yup.object().shape({
    itemImageUrl: Yup.mixed(),
    itemName: Yup.string().required('Item Name is required'),
    itemCode: Yup.string().required('Item Code is required'),
    quantity: Yup.number().required('Quantity is required'),
    price: Yup.number().required('Price is required'),
    shortDescription: Yup.string(),
    longDescription: Yup.string(),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    skuCode: Yup.string(),
    loyaltyPoints: Yup.number(),
    categoryId: Yup.number().required('Category is required'),
  })

  const handleSubmit = async (data) => {
    console.log(data)
    const payload = {
      id: id === 'new' ? 0 : id,
      itemCode: data.itemCode,
      itemName: data.itemName,
      skuCode: data.skuCode,
      categoryId: selectedCategory?.id,
      displayInFrontPage: showInFront === 'true' ? true : false,
      quantity: data.quantity,
      price: data.price,
      isShowWeb: showInWeb === 'true' ? true : false,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      itemImageUrl: itemPic,
      loyaltyPoints: Number(data.loyaltyPoints),
      longitude: parseFloat(longitude) || parseFloat(data.longitude),
      latitude: parseFloat(latitude) || parseFloat(data.latitude),
    }
    console.log(payload)
    await createItem(payload)
      .then((res) => {
        console.log(res)
        if (res?.data?.succeeded) {
          toast.success(
            id === 'new'
              ? 'Item created successfully'
              : 'Item updated successfully',
          )
          setTimeout(() => {
            navigate('/items/list-item')
          }, 2500)
        } else {
          toast.error('Error occured. Try again')
        }
      })
      .catch((e) => {
        console.log(e)
        toast.error(e || 'Error occured')
      })
  }

  const onUploadImgToCloudinary = (pics) => {
    if (
      pics.type === 'image/jpeg' ||
      pics.type === 'image/png' ||
      pics.type === 'image/jpg'
    ) {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset', 'scannerpreset')
      data.append('cloud_name', 'dkqu8p3rs')
      fetch('https://api.cloudinary.com/v1_1/dkqu8p3rs/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setItemPic(data.url.toString())
          toast.success('Image uploaded to cloud')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      toast.info('Please select jpg,png or jpeg type image')
    }
  }

  const handleOptionWebChange = (event) => {
    setShowInWeb(event.target.value)
  }

  const handleOptionFrontChange = (event) => {
    setShowInFront(event.target.value)
  }

  const removeImage = () => {
    setPreviewImage(null)
    setItemPic('')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory({ id: category?.id, name: category?.name })
    setDropdownOpen(false)
  }

  return (
    <Fragment>
      <ToastContainer />
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">Item</Tab>
        </TabList>
        <TabPanel>
          {id !== 'new' && loading ? (
            <></>
          ) : (
            <Formik
              initialValues={
                loading ? defVals : id !== 'new' ? editDefVals : defVals
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="needs-validation user-add" noValidate="">
                <h4>Item Basic Details</h4>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Item Image
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    {!previewImage ? (
                      <Dropzone
                        onDrop={(acceptedFiles) => {
                          onUploadImgToCloudinary(acceptedFiles[0])
                          // setFieldValue('image', acceptedFiles[0]);
                          setPreviewImage(URL.createObjectURL(acceptedFiles[0]))
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop an image here, or click to select
                              one
                            </p>
                          </div>
                        )}
                      </Dropzone>
                    ) : (
                      <div className="preview-container">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="preview-image"
                          style={{ maxWidth: '300px', marginTop: '10px' }}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="btn btn-danger"
                          style={{ marginLeft: '20px' }}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    )}
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Item Name
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="itemName"
                      name="itemName"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="itemName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Item Code
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="itemCode"
                      name="itemCode"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="itemCode"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Quantity
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      type="number"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Price
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="price"
                      name="price"
                      type="number"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">Short Description</Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="shortDescription"
                      name="shortDescription"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="shortDescription"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">Long Description</Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="longDescription"
                      name="longDescription"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="longDescription"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Item Category
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle caret>
                        {selectedCategory.id !== 0
                          ? selectedCategory.name
                          : 'Select Item Category'}
                      </DropdownToggle>
                      {isDropdownLoading ? (
                        <DropdownMenu>
                          <DropdownItem disabled>Loading...</DropdownItem>
                        </DropdownMenu>
                      ) : (
                        <DropdownMenu>
                          {itemCategories?.length > 0 &&
                            itemCategories?.map((cat, index) => (
                              <DropdownItem
                                key={index}
                                value={cat.id}
                                onClick={() => handleCategorySelect(cat)}
                              >
                                {cat.name}
                              </DropdownItem>
                            ))}
                        </DropdownMenu>
                      )}
                    </Dropdown>
                    <ErrorMessage
                      name="categoryId"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>

                <h4 style={{ marginTop: '40px' }}>Item Configurations</h4>
                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Show in Web</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani3"
                          type="radio"
                          name="rdo-ani1"
                          value={'true'}
                          checked={showInWeb === 'true'}
                          onChange={handleOptionWebChange}
                        />
                        Yes
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani4"
                          type="radio"
                          name="rdo-ani1"
                          value={'false'}
                          checked={showInWeb === 'false'}
                          onChange={handleOptionWebChange}
                        />
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xl="3" sm="4">
                    <Label className="form-label">Display in Front Page</Label>
                  </Col>
                  <Col xl="9" sm="8">
                    <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani5"
                          type="radio"
                          name="rdo-ani2"
                          value={'true'}
                          checked={showInFront === 'true'}
                          onChange={handleOptionFrontChange}
                        />
                        Yes
                      </Label>
                      <Label className="d-block">
                        <Input
                          className="radio_animated"
                          id="edo-ani6"
                          type="radio"
                          name="rdo-ani2"
                          value={'false'}
                          checked={showInFront === 'false'}
                          onChange={handleOptionFrontChange}
                        />
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">SKU Code</Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="skuCode"
                      name="skuCode"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="skuCode"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">Loyalty Points</Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="loyaltyPoints"
                      name="loyaltyPoints"
                      type="text"
                      required=""
                      as={Input}
                    />
                    <ErrorMessage
                      name="loyaltyPoints"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup>

                {/* <h4 style={{ marginTop: '40px' }}>Location Information</h4>
                <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Longitude
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      id="longitude"
                      name="longitude"
                      type="text"
                      required=""
                      as={Input}
                      value={longitude}
                      disabled
                    />
                    <ErrorMessage
                      name="longitude"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup> */}
                {/* <FormGroup className="row">
                  <Label className="col-xl-3 col-md-4">
                    <span>*</span> Latitude
                  </Label>
                  <div className="col-xl-8 col-md-7">
                    <Field
                      className="form-control"
                      type="text"
                      required=""
                      id="latitude"
                      name="latitude"
                      as={Input}
                      value={latitude}
                      disabled
                    />
                    <ErrorMessage
                      name="latitude"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </FormGroup> */}
                <div className="pull-right">
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </div>
              </Form>
            </Formik>
          )}
        </TabPanel>
      </Tabs>
    </Fragment>
  )
}

export default TabsetItem
