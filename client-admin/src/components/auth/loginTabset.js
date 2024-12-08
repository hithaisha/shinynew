import React, { Fragment, useState } from 'react'
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'
import { User, Unlock } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { login } from '../api/auth.api'
import { ToastContainer, toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { setAuthDetails } from '../../store/actions/authActions'
import { useDispatch } from 'react-redux'

const LoginTabset = () => {
  const history = useNavigate()
  const [username, setUsername] = useState('admin@hh.com')
  const [password, setPassword] = useState('pass@123')
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const clickActive = (event) => {
    document.querySelector('.nav-link').classList.remove('show')
    event.target.classList.add('show')
  }

  const routeChange = () => {
    // history(`${process.env.PUBLIC_URL}/dashboard`);
    const payload = {
      userName: username,
      password: password,
    }
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
          toast.success(data?.data?.message || 'Login Successful!')
          history(`${process.env.PUBLIC_URL}/users/list-user`)
        } else {
          toast.error(data?.data?.message || 'Error Occured. Try Again!')
        }
      })
      .catch((e) => {
        console.log(e)
        toast.success(e.message)
      })
  }
  return (
    <div>
      <Fragment>
        <ToastContainer />
        <Tabs>
          <TabList className="nav nav-tabs tab-coupon">
            <Tab className="nav-link" onClick={(e) => clickActive(e)}>
              <User />
              Login
            </Tab>
            {/* <Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<Unlock />
							Register
						</Tab> */}
          </TabList>

          <TabPanel>
            <Form className="form-horizontal auth-form">
              <FormGroup>
                <Input
                  required=""
                  name="login[username]"
                  type="email"
                  className="form-control"
                  placeholder="Username"
                  id="exampleInputEmail1"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required=""
                  name="login[password]"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>
              <div className="form-terms">
                <div className="custom-control custom-checkbox me-sm-2">
                  <Label className="d-block">
                    <Input
                      className="checkbox_animated"
                      id="chk-ani2"
                      type="checkbox"
                    />
                    Reminder Me{' '}
                    {/* <span className="pull-right">
											{" "}
											<a href="/#" className="btn btn-default forgot-pass p-0">
												lost your password
											</a>
										</span> */}
                  </Label>
                </div>
              </div>
              <div className="form-button">
                <Button
                  color="primary"
                  type="button"
                  onClick={() => routeChange()}
                >
                  Login
                </Button>
              </div>
              {/* <div className="form-footer">
								<span>Or Login up with social platforms</span>
								<ul className="social">
									<li>
										<a href="/#">
											<i className="icon-facebook"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-twitter-alt"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-instagram"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-pinterest-alt"></i>
										</a>
									</li>
								</ul>
							</div> */}
            </Form>
          </TabPanel>
          {/* <TabPanel>
						<Form className="form-horizontal auth-form">
							<FormGroup>
								<Input
									required=""
									name="login[username]"
									type="email"
									className="form-control"
									placeholder="Username"
									id="exampleInputEmail12"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									required=""
									name="login[password]"
									type="password"
									className="form-control"
									placeholder="Password"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									required=""
									name="login[password]"
									type="password"
									className="form-control"
									placeholder="Confirm Password"
								/>
							</FormGroup>
							<div className="form-terms">
								<div className="custom-control custom-checkbox me-sm-2">
									<Label className="d-block">
										<Input
											className="checkbox_animated"
											id="chk-ani2"
											type="checkbox"
										/>
										I agree all statements in{" "}
										<span>
											<a href="/#">Terms &amp; Conditions</a>
										</span>
									</Label>
								</div>
							</div>
							<div className="form-button">
								<Button
									color="primary"
									type="submit"
									onClick={() => routeChange()}
								>
									Register
								</Button>
							</div>
							<div className="form-footer">
								<span>Or Sign up with social platforms</span>
								<ul className="social">
									<li>
										<a href="/#">
											<i className="icon-facebook"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-twitter-alt"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-instagram"></i>
										</a>
									</li>
									<li>
										<a href="/#">
											<i className="icon-pinterest-alt"></i>
										</a>
									</li>
								</ul>
							</div>
						</Form>
					</TabPanel> */}
        </Tabs>
      </Fragment>
    </div>
  )
}

export default LoginTabset
