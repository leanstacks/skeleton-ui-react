const KEY = {
  PREFERENCES: 'leanstacks.react-starter.preferences'
};

const getJson = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setJson = (key, json) => {
  localStorage.setItem(key, JSON.stringify(json));
};

module.exports = {
  KEY,
  getItem: localStorage.getItem.bind(localStorage),
  getJson,
  setItem: localStorage.setItem.bind(localStorage),
  setJson,
  removeItem: localStorage.removeItem.bind(localStorage)
};
