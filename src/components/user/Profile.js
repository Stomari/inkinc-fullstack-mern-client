import React from 'react';

//Components
import Header from './Header';
import Folder from './Folder';
import CreateFolder from './CreateFolder';


const Profile = (props) => {
  console.log(props)
  return(
    <div>
      <Header user={props.user}/>
      <Folder user={props.user}/>
      <CreateFolder/>
    </div>
  )
}

export default Profile;