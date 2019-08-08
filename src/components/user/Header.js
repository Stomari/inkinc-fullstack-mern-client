import React, {Component} from 'react';

// class Header extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       name: '',
//       profileImg: '',
//     }
//   }

//   render(){
//     return(
//       <div className="d-flex flex-column align-items-center ">
//         <div className="container-custom d-flex justify-content-center">
//           <figure className="snip1566">
//             <img src={this.props.user.profileImg} alt="sq-sample14" />
//             <figcaption><span>UPLOAD</span></figcaption>
//             <a href="#"></a>
//           </figure>
//         </div>
//           <h2 className="pt-4 pb-4 text-uppercase">{this.props.user.name}</h2>
//       </div>
//     )
//   }
// }

const Header = (props) => {
  return (
    <div className={"d-flex flex-column align-items-center upload-image-container"}>
      <div className="container-custom d-flex justify-content-center">
        <label htmlFor="upload-image">
          <figure className="snip1566">
            {
              props.image !== '' ?
              <img src={props.image} alt="sq-sample14" className="profile-image" />  
              : <img src={props.user.profileImg} alt="sq-sample14" />
            }
            {
              <figcaption>
                    <input id="upload-image" type="file" name="image" onChange={(e) => props.handleFileUpload(e)} />
                <span>UPLOAD</span>
              </figcaption>
            }
          </figure>
        </label>
      </div>
      <h2 className="pt-4 pb-4 text-uppercase">{props.user.name}</h2>
    </div>
  )
}

export default Header;