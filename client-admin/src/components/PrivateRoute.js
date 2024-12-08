import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import LayoutRoutes from '../routes/LayoutRoutes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <LayoutRoutes /> : history.push('/login')
      }
    />
  );
};

export default PrivateRoute;
