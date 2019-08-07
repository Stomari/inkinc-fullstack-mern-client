import Header from '../user/Header';
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
import Chat1 from '../chat/Chat1';
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_API_URL);


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
      about: '',
      name: '',
    };
    this.service = new AuthService();
  }

  getArtist() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
        })
        axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
          .then(response => {
            const categories = response.data;
            this.setState({
              categories,
              flag: true
            })
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getArtist();
  }

  componentWillReceiveProps(newProps) {
    axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${newProps.match.params.id}`)
      .then(response => {
        this.setState({
          artist: response.data,
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

  // showChat = (event) => {
  //   event.preventDefault()
  //   socket.emit('SUBSCRIBE', {
  //     user: this.props.user._id,
  //     artist: this.props.match.params.id,
  //   })
  // }

  //VER QUANDO CRIAR PAGINA PRA ESCOLHER PROFILES
favArtist(artistId){
  if(this.props.user === null){
    return null
  }else{
      if(this.props.user.favoriteArtist.length > 0){
        this.props.user.favoriteArtist.forEach(e => {
          if(e._id === artistId){
          }else{
            return axios.put(`http://localhost:8000/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
                  .then(() => this.getArtist())
                  .catch(err => console.log(err));
          }
          })
      }else if (this.props.user.favoriteArtist.length === 0){
        axios.put(`http://localhost:8000/api/favorite-artist/${artistId}`, {}, {withCredentials: true})
          .then(() => this.getArtist())
          .catch(err => console.log(err));
      }
    }
}

  render() {
    return(
      this.state.flag ?

      <div className="container-fluid profile-custom">
        <div className="row m-5">
            
            <div className="col-lg-3 text-center profile-side-header mb-5">
               <HeaderArt artist={this.state.artist}/>
              <div className="row d-flex justify-content-center">

                  {this.props.user && (this.props.user._id === this.state.artist._id) &&  <button onClick={() => this.handleShowCreateTattoo()}>New Tattoo</button>}
                  {this.state.showCreateTattooForm && <CreateTattooForm getArtist={() => this.getArtist()} handlerShowForm={() => this.handleShowCreateTattoo()} categories={this.state.categories}/>}

                  {this.props.user && (this.props.user._id === this.state.artist._id) &&  <button onClick={() => this.handleShowCreateFlash()}>New Flash</button>}
                  {this.state.showCreateFlashForm && <CreateFlashForm getArtist={() => this.getArtist()} handlerShowForm={() => this.handleShowCreateFlash()} categories={this.state.categories}/>}

                 <Flashes
                  user={this.props.user}
                  artist={this.state.artist}
                  categories={this.state.categories}
                  showForm={this.state.showCreateFlashForm}
                  handlerShowForm={() => this.handleShowCreateFlash()}
                  handleDeleteFlash={(e, id) => this.handleDeleteFlash(e, id)}
                  getArtist={() => this.getArtist()}
                />
                <ArtistGallery
                  user={this.props.user}
                  artist={this.state.artist}
                  categories={this.state.categories}
                  showForm={this.state.showCreateTattooForm}
                  handlerShowForm={() => this.handleShowCreateTattoo()}
                  handleDeleteTattoo={(e, id) => this.handleDeleteTattoo(e, id)}
                  getArtist={() => this.getArtist()}
                />
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
                  />
                }
              </div>
              <div className="row">
              <button onClick={(id) => this.favArtist(this.state.artist._id)}>Fav</button>
              </div>
              <div className="artist-info">
                <About artist={this.state.artist}/>
              </div>

              <div className="style-info">
                <CategoriesDisplay category={this.state.artist.category}/>
              </div>

              <div className="map-info">
              <p className="text-uppercase"> Where to find me:</p>
              {
                this.state.artist.workplace &&
                <Map user={this.props.user} artist={this.state.artist} />
              }
              </div>

            </div>

            </div>
            
       
             {
          this.state.artist.category &&
          <Categories showAllCategories={false} user={this.props.user} categories={this.state.categories} artist={this.state.artist} />
        }

        <button onClick={this.showChat}>CHAT</button>
        {/* <Chat1 user={this.props.user} artistId={this.props.match.params.id} /> */}

        </div>
        : null
    )
  }
}

export default ArtistPage;
