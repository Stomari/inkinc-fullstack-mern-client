import React, {Component, Fragment} from 'react';
import SearchBar from './SearchBar';
import Categories from '../Categories';
import ArtistsTattoosToggle from './ArtistsTattoosToggle';
import ArtistsSearch from './ArtistsSearch';
import TattoosSearch from './TattoosSearch';
import Footer from '../Footer';
import axios from 'axios';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      chosenCategories: [],
      searchQuery: '',
      resultsTattoos: [],
      resultsArtists: [],
      filteredResults: [],
      clicked: false,
      searchByTatto: false,
      artistsSearch: false,
      openedImageSave: false,
      imageToSaveId: '',
      shownTattoo: '',
    }
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API_URL}/api/categories`, {withCredentials: true})
      .then(response => {
        const categories = response.data;
        this.setState({
          categories,
        })
      })
      .catch(err => console.log(err));

      let responseTattoos = '';
      let responseArtists = '';

      axios.get(`${process.env.REACT_APP_API_URL}/api/tattoo`, {withCredentials: true})
      .then(response => {
        responseTattoos = response.data;
        this.setState({
          resultsTattoos: responseTattoos,
        })


        axios.get(`${process.env.REACT_APP_API_URL}/api/artists`, {withCredentials: true})
        .then(response => {
          responseArtists = response.data;
          this.setState({
            resultsArtists: responseArtists,
          })

          const filtered = this.state.artistsSearch ? responseArtists : responseTattoos;
          this.setState({
            filteredResults: filtered,
          })

        })
        .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
      

      // this.getResults();
  }

  searchHandler(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
    this.filterHandler(value);
  }

  filterHandler(value) {
    let filtered = this.state.filteredResults;
    // split user's input query
    const inputTags = value.split(' ').filter(el => el !== '');
    const chosenCategories = this.state.chosenCategories;

    // define results as Artists or Tattoos and search
    if (!this.state.artistsSearch) {
      const results = this.state.resultsTattoos;
      // filter results
      filtered = results.filter(result => {
        return (
          // compare tags and input query
          inputTags.every(tag => {
            return result.tag.some(rt => rt.toLowerCase().includes(tag.toLowerCase()));
          })
          &&
          // compare categories
          chosenCategories.every(cc => {
            return result.category.some(rc => rc === cc);
          })
        )
      })
    } else {
      const results = this.state.resultsArtists;
      // filter results
      filtered = results.filter(result => {
        return (
          inputTags.every(tag => {
            return result.name.toLowerCase().includes(tag.toLowerCase());
          })
          &&
          chosenCategories.every(cc => {
            return result.category.some(rc => rc === cc);
          })
        )
      });
    }
    this.setState({
      filteredResults: filtered,
    });
  }

  // getResults() {
  //   const showResults = this.state.filteredResults;
    
  //   return showResults.map((el, idx) => {
  //     if (!this.state.artistsSearch) {
  //       return <Link to={`/tattoos/${el._id}`} key={idx} className="search-autocomplete-item"><img src={el.image} alt={el.tag} /></Link>
  //     } else {
  //       return <Link to={`/artists/${el._id}`} key={idx} className="search-autocomplete-item">{el.name}</Link>
  //     }
  //   });
  // }

  openedImageSaveHandler(event, i) {
    event.preventDefault();
    this.getSingleTattoo(i);
  }

  chooseCategories(event) {
    const {checked, id} = event.target;
    if (checked) {
      this.state.chosenCategories.push(id);
    } else {
      this.state.chosenCategories.splice(this.state.chosenCategories.indexOf(id), 1);
    }
    this.filterHandler(this.state.searchQuery);
  }

  toggleHandler() {
    const changedArtistsSearch = !this.state.artistsSearch;
    const filtered = changedArtistsSearch ? this.state.resultsArtists : this.state.resultsTattoos;
    this.setState({
      artistsSearch: changedArtistsSearch,
      filteredResults: filtered,
      searchQuery: '',
    });
    // this.getResults();
  }

  handleCloseModal() {
    this.setState({
      openedImageSave: false,
      imageToSaveId: '',
      shownTattoo: '',
    })
  }

  getSingleTattoo(id) {
    axios.get(`http://localhost:8000/api/tattoo/${id}`, {withCredentials: true})
      .then(response => {
        const tattoo = response.data;
        const idx = !this.state.openedImageSave ? id : ''
        this.setState({
          openedImageSave: !this.state.openedImageSave,
          imageToSaveId: idx,
          shownTattoo: tattoo
        })
      })
      .catch(err => console.log(err));
  }

  addToFolder(id) {
    const tattooId = this.state.shownTattoo;
    const folderId = id;
    axios.post('http://localhost:8000/api/add-tattoo-folder', { tattooId, folderId }, {withCredentials: true})
      .then(() =>  {
        this.handleCloseModal();
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Fragment>
        <div className="container">
          <ArtistsTattoosToggle artistsSearch={this.state.artistsSearch} toggleHandler={() => this.toggleHandler()} />
          <SearchBar state={this.state} searchHandler={(event) => this.searchHandler(event)} />
          <Categories categories={this.state.categories} chooseCategories={(e) => this.chooseCategories(e)} />
  
          {
            this.state.artistsSearch && 
            <ArtistsSearch filteredResults={this.state.filteredResults} />
          }
          {
            !this.state.artistsSearch &&
            <TattoosSearch
              openedImageSaveHandler={(e, i) => this.openedImageSaveHandler(e, i)}
              openedImageSave={this.state.openedImageSave}
              filterHandler={() => this.filterHandler(this.state.searchQuery)}
              categories={this.state.categories}
              filteredResults={this.state.filteredResults}
              tattoos={this.state.resultsTattoos}
              user={this.props.user}
            />
          }
  
        </div>
        {/* save to folder modal */}
        {
          this.state.imageToSaveId !== '' &&
          <div className="modal-wrapper">
            {console.log('USER', this.props.user)}
            <span className="close-modal-btn" onClick={() => this.handleCloseModal()}></span>
            <div className="form-modal">
              {this.state.shownTattoo !== '' && <img src={this.state.shownTattoo.image} width="300" alt={this.state.shownTattoo.tag.join(', ')} />}
              {this.props.user && this.props.user.folder && this.props.user.folder.map((el, idx) => <button key={idx} onClick={(id) => this.addToFolder(el._id)} >{el.name}</button>)}
            </div>
            <div className="modal-bg" onClick={() => this.handleCloseModal()}></div>
          </div>
        }
        <Footer />
      </Fragment>
    );
  }
}

// searchHandler={(event) => this.searchHandler(event)}

export default SearchPage;
