import React, { Fragment } from 'react'
import Slider from 'react-slick'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap'
import MasterBanner from './MasterBanner'

const Data = [
  {
    img: 'home1',
    title: 'Hey! Welcome to',
    desc: 'Heritage Heaven ',
    link: '/',
  },
  {
    img: 'home2',
    title: 'get the',
    desc: 'item location instantly',
    link: '/',
  },
]

const Banner = () => {
  return (
    <Fragment>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {Data.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                desc={data.desc}
                title={data.title}
                link={data.link}
              />
            )
          })}
        </Slider>
      </section>
    </Fragment>
  )
}

export default Banner
