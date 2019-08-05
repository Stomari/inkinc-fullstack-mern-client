import React from 'react';
import { Link } from 'react-router-dom';

//Component
import ByAddressSearch from '../places/ByAddressSearch';
import ByPlaceSearch from '../places/ByPlaceSearch';

const Form = (props) => {
  
    return(
        <div className="col-lg-6">
          <form onSubmit={(event) => this.handleFormSubmit(event)}>
            <div className="form-group">
              <label for="email">Email:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email" value={props.state.password} onChange={ e => props.handleChange(e)}/>
            </div>
            <div className="form-group"> 
              <label for="password">Password:</label>
              <input type="password"  class="form-control" name="password" placeholder="Password" value={props.state.password} onChange={ e => props.handleChange(e)}/>
            </div>
            <div className="form-group"> 
              <label for="name">Name:</label>
              <input type="text" class="form-control" name="name" placeholder="Jon Snow" value={props.state.name} onChange={ e => props.handleChange(e)}/>
            </div>
         
          {
            props.state.role === 'Artist' ?
            <div> 
              <label for="workplace"> Workplace:</label>
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
              <input class="btn btn-custom" type="submit" value="SignUp" />
      </form>
      <small className="form-text text-muted">
        Already have an account?
        <Link to={"/login"}> LogIn</Link>
      </small>
      </div>
    )
}

export default Form;