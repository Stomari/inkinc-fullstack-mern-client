
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const protectedRoute  = ({component: Component, user, getUser, ...rest}) => {
  return (
    <Route
    {...rest}
    render={ props => {
      if(user){
              return <Component {...props} user={user} getUser={(obj) => getUser(obj)}/> 
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default protectedRoute;