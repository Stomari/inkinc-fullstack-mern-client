import React, {Component} from 'react';

class CreateTattooForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      image: '',
      category: [],
      user: this.props.user,
    }
  }
  
  render() {
    console.log(this.props)
    return(

      <p>FLASH FORM</p>
    )
  }
}

export default CreateTattooForm;