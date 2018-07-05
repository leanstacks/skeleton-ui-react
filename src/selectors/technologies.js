export const getTechnologiesByType = (technologies = [], type) => {
  return technologies.filter((technology) => technology.type === type);
};

export const getTechnology = (technologies = [], technologyId) => {
  return technologies.find((technology) => technology.id === technologyId);
};
