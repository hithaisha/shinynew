import React,{ Fragment } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "../components/auth/login"
import LayoutRoutes from "./LayoutRoutes"
import PrivateRoute from "../components/PrivateRoute"
import { useSelector } from 'react-redux';

const Routers =() =>{
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useNavigate();

    return(
        <Fragment>
            <Routes>
                <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
					<Route
						exact
						path={`${process.env.PUBLIC_URL}/auth/login`}
						element={<Login />}
					/>
                    <Route path={`/*`} element={isAuthenticated ? <LayoutRoutes /> : <Login />} />
            </Routes>
        </Fragment>
    )
}

export default Routers