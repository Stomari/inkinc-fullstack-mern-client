import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      image: ''
    }
  }

  render(){
    return(
      <div>
        <picture>
          {/* grid image */}
          <img src={this.props.state.image}/>
        </picture>
        <p>
        {this.props.state.name}
        <Link>Edit</Link>
        </p>
      </div>
    )
  }
}

export default Header;