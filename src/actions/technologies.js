import axios from 'axios';

// SET_TECHNOLOGIES
export const setTechnologies = (technologies) => ({
  type: 'SET_TECHNOLOGIES',
  technologies
});

// START_SET_TECHNOLOGIES
export const startSetTechnologies = () => {
  return (dispatch) => {
    const config = {
      url: `/assets/data/technologies/technologies.json`,
      method: 'get'
    };
    return axios.request(config)
      .then((response) => {
        dispatch(setTechnologies(response.data));
        localStorage.setItem('technologies', JSON.stringify(response.data));
        localStorage.setItem('technologies_lu', new Date().toISOString());
      }).catch((err) => {
        console.error('API error. ', err);
      });
  };
};
