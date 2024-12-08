import React, { Fragment } from 'react'
import Link from 'next/link'

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={'/'}>
        <a>
          <img
            src={`/assets/images/icon/${logo ? logo : 'logo.png'}`}
            alt=""
            className="img-fluid"
            width={150}
          />
        </a>
      </Link>
    </Fragment>
  )
}

export default LogoImage
