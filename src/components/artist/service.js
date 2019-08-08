import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    return service.post('/add-flash', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}