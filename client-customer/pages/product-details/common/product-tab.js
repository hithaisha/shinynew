import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap'
import { getItems, getProductById } from '../../../api/item.api'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const ProductTab = (props) => {
  const url = window.location.href
  const id = url.split('/product-details/')[1].split('-')[0]

  const [activeTab, setActiveTab] = useState('1')
  const [productDetails, setProductDetails] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [error, setError] = useState(null)
  const [distance, setDistance] = useState(0)
  const [similarProducts, setSimilarProducts] = useState([])

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
          // console.log('Latitude: ' + lat)
          // console.log('Longitude: ' + long)
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
    const intervalId = setInterval(() => {
      if (longitude && latitude && productDetails) {
        const lat1 = latitude // Latitude of point 1
        const lon1 = longitude // Longitude of point 1
        const lat2 = productDetails?.latitude // Latitude of point 2
        const lon2 = productDetails?.longitude // Longitude of point 2
        console.log(
          calculateDistance(lat1, lon1, lat2, lon2),
          lat1,
          lon1,
          lat2,
          lon2,
        )
        setDistance(calculateDistance(lat1, lon1, lat2, lon2))
        // const directionsService = new google.maps.DirectionsService()

        // const origin = { lat: lat1, lng: lon1 }
        // const destination = { lat: lat2, lng: lon2 }

        // directionsService.route(
        //   {
        //     origin,
        //     destination,
        //     travelMode: 'DRIVING', // You can change the travel mode as needed
        //   },
        //   (response, status) => {
        //     if (status === 'OK') {
        //       setDirections(response)
        //       console.log(response)
        //     } else {
        //       console.error(`Error fetching directions: ${status}`)
        //     }
        //   },
        // )
        // console.log(
        //   `The distance between the two points is ${distance} kilometers.`,
        // )
      }
    }, 2000)

    // Clear the interval when the component unmounts or when no longer needed
    return () => clearInterval(intervalId)
  }, [longitude, latitude, productDetails])

  useEffect(() => {
    if (id > 0) {
      getProductById(id)
        .then((data) => {
          setProductDetails(data?.data)
          if (data?.data) {
            getItems({
              searchText: '',
              categoryId: data?.data?.categoryId,
            }).then((res) => {
              setSimilarProducts(res?.data)
            })
          }
          console.log(data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [id])

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180) // Convert latitude difference to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180) // Convert longitude difference to radians
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in kilometers

    return distance
  }

  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === '1' ? 'active' : ''}
                    onClick={() => setActiveTab('1')}
                  >
                    Description
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === '2' ? 'active' : ''}
                    onClick={() => setActiveTab('2')}
                  >
                    Location
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === '3' ? 'active' : ''}
                    onClick={() => setActiveTab('3')}
                  >
                    Similar Products
                  </NavLink>
                </NavItem>
                {/* <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === '3' ? 'active' : ''}
                    onClick={() => setActiveTab('3')}
                  >
                    video
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === '4' ? 'active' : ''}
                    onClick={() => setActiveTab('4')}
                  >
                    Write Review
                  </NavLink>
                </NavItem> */}
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  <div className="container mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <img
                          src={productDetails?.itemImageUrl}
                          alt={productDetails?.itemName}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-6">
                        <h2>
                          {productDetails?.itemName +
                            ' ' +
                            '(' +
                            productDetails?.itemCode +
                            ')'}
                        </h2>
                        <p>Category: {productDetails?.categoryName}</p>
                        <p>Price: Rs.{productDetails?.price}</p>
                        <p>Quantity: {productDetails?.quantity}</p>
                        <p>
                          Loyalty Points: {productDetails?.loyalityPoints || 0}
                        </p>
                        <p>{productDetails?.longDescription}</p>
                      </div>
                    </div>
                    <div className="row mt-4">
                      {productDetails?.longDescription?.length > 0 && (
                        <div className="col">
                          <h4>Description</h4>
                          <p>{productDetails?.longDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  {productDetails?.latitude && productDetails?.longitude && (
                    <div style={{ marginBottom: '100px' }}>
                      <h4 style={{ marginTop: '10px', marginBottom: '10px' }}>
                        Distance -{' '}
                        {parseFloat(parseFloat(distance * 1000).toFixed(2))}{' '}
                        Meters
                      </h4>
                      <Map
                        style={{
                          height: '500px',
                          position: 'relative',
                          width: '100%',
                        }}
                        google={window.google}
                        zoom={20}
                        initialCenter={{
                          lat: productDetails?.latitude,
                          lng: productDetails?.longitude,
                        }}
                      >
                        <Marker
                          title="Your Location"
                          name="Your Location"
                          position={{
                            lat: productDetails?.latitude,
                            lng: productDetails?.longitude,
                          }}
                        />
                      </Map>
                    </div>
                  )}
                </TabPane>
                <TabPane tabId="3">
                  {similarProducts?.length > 0 ? (
                    <Row style={{ marginTop: '20px' }}>
                      {similarProducts.map((item, index) => (
                        <Col
                          sm="4"
                          key={index}
                          onClick={() =>
                            (window.location.href = `/product-details/${item?.id}-${item?.itemName}`)
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          <Card
                            className="mb-3"
                            style={{ boxShadow: 'inherit' }}
                          >
                            <CardImg
                              top
                              width="100%"
                              src={item.itemImageUrl}
                              alt={item.itemName}
                            />
                            <CardBody>
                              <CardTitle>{item.itemName}</CardTitle>
                              <CardText>
                                Available Stock: {item.quantity}
                              </CardText>
                              <CardText>Total Price: Rs.{item.price}</CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <h3>No products found</h3>
                  )}
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // LoadingContainer: LoadingContainer
})(ProductTab)
