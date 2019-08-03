import React, {Component} from 'react';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      profileImg: '',
    }
  }

  render(){
    return(
      <div>
        <h3>{this.props.user.name}</h3>
        <picture>
          <img src={this.props.user.profileImg} alt=''/>
        </picture>
        <p> change profile picture</p>
      </div>
    )
  }
}

export default Header;