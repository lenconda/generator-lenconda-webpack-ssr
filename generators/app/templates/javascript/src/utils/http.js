import axios from 'axios';

axios.defaults.timeout = 3600000;
axios.interceptors.response.use(response => {
  if (response.data.data &&
      Object.prototype.toString.call(response.data.data) === '[object String]') {
    // Do something
  }
  return response;
}, error => {
  if (error.response.data.message) { alert(error.response.data.message) }
});

export default axios;
