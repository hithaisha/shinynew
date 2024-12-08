import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter()
  const logout = () => {
    localStorage.setItem('user', false)
    localStorage.clear()
    router.push('/page/account/login')
  }
  const isAuthenticated = localStorage.getItem('authToken')

  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Our store Heritage Heaven </li>
                <li>
                  <i className="fa fa-phone text-white" aria-hidden="true"></i>
                  Call Us: 123 - 456 - 7890
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> My Account
                <ul className="onhover-show-div">
                  {!isAuthenticated && (
                    <>
                      <li>
                        <Link href={`/page/account/login`}>
                          <a>Login</a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/page/account/register`}>
                          <a>Register</a>
                        </Link>
                      </li>
                    </>
                  )}

                  <li onClick={() => logout()}>
                    <a>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TopBarDark
