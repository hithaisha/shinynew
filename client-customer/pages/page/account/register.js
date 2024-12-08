import React, { useState } from 'react'
import CommonLayout from '../../../components/shop/common-layout'
import { Input, Container, Row, Form, Label, Col } from 'reactstrap'
import { useRouter } from 'next/router'
import { createUser } from '../../../api/auth.api'

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleFNameChange = (event) => {
    setFirstName(event.target.value)
  }
  const handleLNameChange = (event) => {
    setLastName(event.target.value)
  }

  const regUser = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }
    console.log(payload)
    createUser(payload)
      .then((data) => {
        console.log(data.data)
        if (data?.data?.succeeded) {
          router.push(`/page/account/login`)
          setTimeout(() => {
            alert('Please signin again to continue')
          }, 1000)
        } else {
          console.error(data?.data?.message || 'Error Occured. Try Again!')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="First Name"
                        required=""
                        value={firstName}
                        onChange={handleFNameChange}
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label" for="review">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Last Name"
                        required=""
                        value={lastName}
                        onChange={handleLNameChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label className="form-label" for="email">
                        email
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Col>
                    <Col md="6">
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
                    </Col>
                    <Col md="12">
                      <div onClick={regUser} className="btn btn-solid">
                        Register
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  )
}

export default Register
