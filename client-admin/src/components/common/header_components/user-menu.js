import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//images import
import man from '../../../assets/images/dashboard/man.png'
import { useDispatch } from 'react-redux'
import { resetAuthDetails } from '../../../store/actions/authActions'

const UserMenu = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(resetAuthDetails())
    localStorage.clear()
    history.push(`${process.env.PUBLIC_URL}`)
  }

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
            src={man}
            alt="header-user"
          />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          {/* <li>
						<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
							<i data-feather="user"></i>Edit Profile
						</Link>
					</li> */}
          {/* <li>
						<a href="#javaScript">
							<i data-feather="mail"></i>Inbox
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="lock"></i>Lock Screen
						</a>
					</li>
					<li>
						<a href="#javaScript">
							<i data-feather="settings"></i>Settings
						</a>
					</li> */}
          <li>
            <Link to={`${process.env.PUBLIC_URL}/`} onClick={handleLogout}>
              <i data-feather="log-out"></i>Logout
            </Link>
          </li>
        </ul>
      </li>
    </Fragment>
  )
}

export default UserMenu
