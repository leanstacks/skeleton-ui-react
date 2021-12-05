import filter from 'lodash/filter';
import find from 'lodash/find';

export const getTechnologiesByType = (technologies = [], type) => {
  return filter(technologies, { type });
};

export const getTechnology = (technologies = [], technologyId) => {
  return find(technologies, { id: technologyId });
};
