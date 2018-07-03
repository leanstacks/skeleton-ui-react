import axios from 'axios';

import config from '../config/environment';

// SET_TECHNOLOGIES
export const setTechnologies = (technologies) => ({
  type: 'SET_TECHNOLOGIES',
  technologies
});

const apiUrl = config.apiUrl || '';

// START_SET_TECHNOLOGIES
export const startSetTechnologies = () => {
  return (dispatch) => {
    const config = {
      url: `${apiUrl}/assets/data/technologies/technologies.json`,
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    };
    return axios.request(config)
      .then((response) => {
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        dispatch(setTechnologies(response.data));
        localStorage.setItem('technologies', JSON.stringify(response.data));
        localStorage.setItem('technologies_lu', Date.now());
      }).catch((err) => {
        console.error('API error. ', err);
      });
  };
};
