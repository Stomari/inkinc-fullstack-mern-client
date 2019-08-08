import React, { Component } from 'react';

class HeaderArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profileImg: '',
    }
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center ">
        <div className="container-custom d-flex justify-content-center">
          <figure className="snip1566">
            <img src={this.props.artist.profileImg} alt="sq-sample14" />
            <figcaption><span>UPLOAD</span></figcaption>
          </figure>
        </div>
        <h2 className="pt-4 pb-4 text-uppercase">{this.props.artist.name}</h2>
      </div>
    )
  }
}

export default HeaderArt;