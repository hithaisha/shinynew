import React, { Fragment } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Media } from 'reactstrap'
import banner1 from '../../../../public/assets/images/sub-banner1.jpg'
import banner2 from '../../../../public/assets/images/sub-banner2.jpg'

const Data = [
  {
    img: banner1,
    about: 'Vegetables',
    offer: '10% off for selected',
    link: '/',
    class: 'p-right text-center',
  },
  {
    img: banner2,
    about: 'biscuits',
    offer: '15% off for selected',
    link: '/',
    class: 'p-right text-center',
  },
]

const MasterCollectionBanner = ({ img, about, offer, link, classes }) => {
  return (
    <Col md="6">
      <Link href={link}>
        <a>
          <div className={`collection-banner ${classes} gradient-overlay`}>
            <Media src={img} className="img-fluid" alt="" />
            <div className="contain-banner">
              <div>
                <h4>{offer}</h4>
                <h2 style={{ color: 'white' }}>{about}</h2>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  )
}

const CollectionBanner = () => {
  return (
    <Fragment>
      {/*collection banner*/}
      <section className="pb-0">
        <Container>
          <Row className="partition2">
            {Data.map((data, i) => {
              return (
                <MasterCollectionBanner
                  key={i}
                  img={data.img.src}
                  about={data.about}
                  link={data.link}
                  offer={data.offer}
                  classes={data.class}
                />
              )
            })}
          </Row>
        </Container>
      </section>
      {/*collection banner end*/}
    </Fragment>
  )
}

export default CollectionBanner
