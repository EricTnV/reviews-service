import axios from 'axios';

// const id = window.location.pathname;
const id = new URLSearchParams(window.location.search).get('propertyId');
// search.split('?propertyID=')[1];

const instance = axios.create({
  baseURL: `/api/rooms/${id}/reviews`,
});

export default instance;
