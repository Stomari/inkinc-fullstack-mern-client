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
      <div className="col-lg-12">
        <div className="row">
        ​<div className="col-lg-6">
          <img src={this.props.user.profileImg} className="img-thumbnail rounded img-custom" alt="profile"/>
        <p className="text-uppercase pt-4"> Upload new picture</p>
        </div>
        <div>
        <h3 className="display-4">{this.props.user.name}</h3>
        </div>
        </div>
      </div>
    )
  }
}

export default Header;