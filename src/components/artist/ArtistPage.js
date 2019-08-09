import React, {Component} from 'react';
import HeaderArt from './HeaderArt';
import Categories from './Categories';
import axios from 'axios';
import Map from './Map';
import Flashes from './Flashes';
import ArtistGallery from './ArtistGallery';
import About from './About';
import CategoriesDisplay from './CategoriesDisplay';
import EditArtist from './EditArtist';
import AuthService from '../auth/auth-service';
import CreateTattooForm from './CreateTattooForm';
import CreateFlashForm from './CreateFlashForm';
import Chat from '../chat/Chat';

class ArtistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      artist: '',
      flag: false,
      showCreateTattooForm: false,
      showCreateFlashForm: false,
      showEditArtistForm: false,
      artistCategories: [],
      name: '',
      about: '',
      category: '',
      image: '',
      workplace: '', 
      showFollow: true
    };
    this.service = new AuthService();
  }

  getArtist() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
          name: response.data.name,
          about: response.data.about,
          category: response.data.category.map(el => el._id),
          image: response.data.profileImg,
          workplace: response.data.workplace,
        })
        this.handleShowFollow(this.props.match.params.id)

        axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
          .then(response => {
            const categories = response.data;
            this.setState({
              categories,
              flag: true,

            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getArtist();
  }

  componentWillReceiveProps(newProps) {
    axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${newProps.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
          image: response.data.profileImg,
        })
      })
      .catch(err => console.log(err));
  }

  handleShowCreateTattoo() {
    this.setState({
      showCreateTattooForm: !this.state.showCreateTattooForm,
    })
  }

  handleShowCreateFlash() {
    this.setState({
      showCreateFlashForm: !this.state.showCreateFlashForm,
    })
  }

  handleShowEditProfile() {
    // event.preventDefault();
    this.setState({
      showEditArtistForm: !this.state.showEditArtistForm,
    })
  }

  handleDeleteFlash(event, id) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/api/remove-flash/${id}`, {}, { withCredentials: true })
      .then(() => {
        this.getArtist();
      })
      .catch(err => console.log(err));
  }

  handleDeleteTattoo(event, id) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/api/remove-tattoo/${id}`, {}, { withCredentials: true })
      .then(() => {
        this.getArtist();
      })
      .catch(err => console.log(err));
  }

  handleChange(event) {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleChangeCheckbox(event) {
    const {value} = event.target;
    let newCategory = [...this.state.category];
    if (newCategory.some(cat => cat === value)) {
      newCategory = newCategory.filter(el => el !== value)
    } else {
      newCategory.push(value);
    }
    this.setState({category: newCategory});
  }

  handleFileUpload(e) {
    this.setState({
      image: 'https://media.tenor.com/images/80cb16bb74ed9027ea1b25d077ce6d97/tenor.gif'
    });
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {withCredentials: true})
      .then(response => {
          this.setState({ image: response.data.secure_url });
          axios.put(`${process.env.REACT_APP_API_URL}/api/edit-artist`, this.state, {withCredentials: true})
            .then(() => {
              this.getArtist();
            })
            .catch(err => console.log(err));
        })
      .catch(err => console.log(err));
  }

  handleUserInfo(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {withCredentials: true})
      .then((response) => {
        this.props.getUser(response.data);
      })
      .catch(err => console.log(err))
  }

// VER QUANDO CRIAR PAGINA PRA ESCOLHER PROFILES
favArtist(artistId){
  if(this.props.user === null){
    return null
  }else{
    if(this.props.user.favoriteArtist.length > 0){
      this.props.user.favoriteArtist.forEach(e => {
        if(e._id === artistId){
          console.log("err")
        }else{
          return axios.put(`${process.env.REACT_APP_API_URL}/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
                .then(() => {
                  this.handleUserInfo()
                  this.setState({
                    showFollow: false
                  })
                })
                .catch(err => console.log(err));
        }
        })
    }else if (this.props.user.favoriteArtist.length === 0){
      axios.put(`${process.env.REACT_APP_API_URL}/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
        .then(() => {
          this.handleUserInfo()
          this.setState({
            showFollow: false
          })
        })
        .catch(err => console.log(err));
    }
  }
}


handleShowFollow(id){
  if(this.props.user === undefined){
    return null
  }else{
  this.props.user.favoriteArtist.forEach(e => {
    if(e._id === id){
      this.setState({
        showFollow: false
      })
    }
  })
  }
}

  render() {
    return(
      this.state.flag ?

      <div className="container-fluid profile-custom">
        <div className="row m-5">
            
            <div className="col-lg-3 d-flex justify-content-center text-center profile-side-header align-items-start">
            <div className="d-flex row justify-content-center align-items-start">
              
               <HeaderArt
                user={this.props.user}
                artist={this.state.artist}
                getArtist={() => this.getArtist()}
                handleFileUpload={(e) => this.handleFileUpload(e)}
                image={this.state.image}
               />
              <div className="row d-flex justify-content-center col-lg-12">
                <div className="col-lg-10">
                {this.props.user && (this.props.user._id === this.state.artist._id) &&  <button onClick={() => this.handleShowCreateTattoo()} className="btn-artist">Upload Work</button>}
                {this.state.showCreateTattooForm && <CreateTattooForm getArtist={() => this.getArtist()} handlerShowForm={() => this.handleShowCreateTattoo()} categories={this.state.categories}/>}

                {this.props.user && (this.props.user._id === this.state.artist._id) &&  <button onClick={() => this.handleShowCreateFlash()} className="btn-artist">New Flash</button>}
                {this.state.showCreateFlashForm && <CreateFlashForm getArtist={() => this.getArtist()} handlerShowForm={() => this.handleShowCreateFlash()} categories={this.state.categories}/>}
                </div>

                <div className="col-lg-2 edit">

                {
                  this.props.user && (this.props.user._id === this.state.artist._id) &&
                  <EditArtist
                    handleShowEditProfile={() => this.handleShowEditProfile()}
                    showEditProfileForm={this.state.showEditArtistForm}
                    getArtist={() => this.getArtist()}
                    state={this.state}
                    categories={this.state.categories}
                    showAllCategories={true}
                    user={this.props.user}
                    artist={this.state.artist}
                    handleChange={(e) => this.handleChange(e)}
                    handleChangeCheckbox={(e) => this.handleChangeCheckbox(e)}
                  />
                }
              </div>
              </div>
              
              <div className="art-div-info">
               
                <About artist={this.state.artist}/>

                <CategoriesDisplay category={this.state.artist.category}/>

              <div className="map-info">
              <h6 className="text-uppercase"> Where to find me:</h6>
              {
                this.state.artist.workplace &&
                <Map user={this.props.user} artist={this.state.artist} />
              }
              </div>

              </div>
              </div>
            </div>

            <div className="col-lg-9">

                <h5 className="text-uppercase text-center" style={{margin: '100px 0 50px 0'}}>Flashes</h5>
              {/* <div className="row"> */}
              <div className="col-lg-12 d-flex flashes-container-out">

                <Flashes
                  user={this.props.user}
                  artist={this.state.artist}
                  categories={this.state.categories}
                  showForm={this.state.showCreateFlashForm}
                  handlerShowForm={() => this.handleShowCreateFlash()}
                  handleDeleteFlash={(e, id) => this.handleDeleteFlash(e, id)}
                  getArtist={() => this.getArtist()}
                />
              </div>
              {/* </div> */}

              <div className="col-lg-12">
                <h5 className="text-uppercase text-center" style={{margin: '100px 0 50px 0'}}>Portfolio</h5>
                <ArtistGallery
                  user={this.props.user}
                  artist={this.state.artist}
                  categories={this.state.categories}
                  showForm={this.state.showCreateTattooForm}
                  handlerShowForm={() => this.handleShowCreateTattoo()}
                  handleDeleteTattoo={(e, id) => this.handleDeleteTattoo(e, id)}
                  getArtist={() => this.getArtist()}
                />
              </div>
               
            </div>
            </div>
            
       
             {
          this.state.artist.category &&
          <Categories showAllCategories={false} user={this.props.user} categories={this.state.categories} artist={this.state.artist} />
        }

        <Chat user={this.props.user} artistId={this.props.match.params.id} getUser={this.props.getUser} />

        </div>
        : null
    )
  }
}

export default ArtistPage;
