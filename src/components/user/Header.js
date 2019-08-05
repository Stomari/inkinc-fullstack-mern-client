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
      <div className="d-flex flex-column align-items-center">
        <div className="container-custom">
          <img src={this.props.user.profileImg} className="img-thumbnail rounded img-custom" alt="profile"/>
          <div className="overlay">
            <p className="text text-uppercase">
              upload new image
            </p>
          </div>
        </div>
          <h2 className="pt-4 pb-4 text-uppercase">{this.props.user.name}</h2>
      </div>
    )
  }
}

export default Header;