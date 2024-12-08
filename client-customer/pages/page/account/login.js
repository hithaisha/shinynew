import React, { useState } from 'react'
import CommonLayout from '../../../components/shop/common-layout'
import { Container, Row, Form, Label, Input, Col } from 'reactstrap'
import { login } from '../../../api/auth.api'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import { setAuthDetails } from '../../store/actions/authActions'
import { useDispatch } from 'react-redux'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('customer@morr.com')
  const [password, setPassword] = useState('pass@123')

  const handleUsernameChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginAuth = () => {
    const payload = {
      userName: email,
      password: password,
    }
    console.log(payload)
    login(payload)
      .then((data) => {
        console.log(data.data)
        if (data?.data?.isLoginSuccess) {
          const authData = {
            token: data?.data?.token,
            user: jwtDecode(data?.data?.token),
            isAuthenticated: true,
          }
          localStorage.setItem('authToken', JSON.stringify(authData))
          dispatch(setAuthDetails(authData))
          router.push(`/`)
          setTimeout(() => {
            alert('Login Successful')
          }, 1000)
        } else {
          console.error(data?.data?.message || 'Error Occured. Try Again!')
          setTimeout(() => {
            alert('Try Again')
          }, 1000)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Login</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <div className="form-group">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                      value={email}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label className="form-label" for="review">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      required=""
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div onClick={loginAuth} className="btn btn-solid">
                    Login
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg="6" className="right-login">
              <h3>New Customer</h3>
              <div className="theme-card authentication-right">
                <h6 className="title-font">Create A Account</h6>
                <p>
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <a href="/page/account/register" className="btn btn-solid">
                  Create an Account
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  )
}

export default Login
