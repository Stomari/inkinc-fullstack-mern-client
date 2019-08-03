import React from 'react';
import { Link } from 'react-router-dom';

//Component
import ByAddressSearch from '../places/ByAddressSearch';
import ByPlaceSearch from '../places/ByPlaceSearch';

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
              {
                props.state.showWorkplace ?
                <ByAddressSearch placeHandler={(value) => props.placeHandler(value)} submitPlace={e => props.handleChange(e)}></ByAddressSearch>
                : 
                <ByPlaceSearch placeHandler={(value) => props.placeHandler(value)} submitPlace={e => props.handleChange(e)}></ByPlaceSearch>
              }
                {
                  props.state.showWorkplace ?
                    <p>
                    Find your workplace!
                    <Link onClick={e => props.handleWorkplace(e)}> Find workplace</Link>
                    </p>
                  :
                    <p>
                      Can't find your place?
                      <Link onClick={e => props.handleWorkplace(e)}> Create One </Link>
                    </p>
                  }
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