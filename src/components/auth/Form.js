import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
      return(
        <div>
         <form onSubmit={(event) => props.handleFormSubmit(event)}>
            <label>Email:</label>
            <input type="text" name="email" value={props.state.email} onChange={ e => props.handleChange(e)}/>
            <br/>
            <label>Password:</label>
            <input type="password"  name="password" value={props.state.password} onChange={ e => props.handleChange(e)} />
            <br/>
            <label> Name:</label>
            <input type="text"  name="name" value={props.state.name} onChange={ e => props.handleChange(e)} />
            <br/>
            {
              props.state.role === 'Artist' ?
              <div>
                <label> workplace:</label>
                <input type="text"  name="workplace" value={props.state.name} onChange={ e => props.handleChange(e)} />
              </div>
              : null
            }
            <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account? 
          <Link to={"/login"}> Login </Link>
        </p>
        </div>
      )
}

export default Form;