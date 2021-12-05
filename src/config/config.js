import axios from 'axios';

/** The default application configuration. */
const defaultConfig = {
  baseUrl: 'http://localhost:9000'
};

class Config {

  constructor(configObj = defaultConfig) {
    if (!Config.instance) {
      this._config = configObj;
      Config.instance = this;
    }

    return Config.instance;
  }

  init = async () => {
    try {
      const response = await axios.get('/config/config.json');
      const remoteConfig = JSON.parse(response.data);
      this._config = Object.assign(this._config, remoteConfig);
    } catch (err) {
      console.log(`Unable to load remote config. ${err}`);
    }
  }

  get = () => {
    return this._config;
  }

}

const instance = new Config();

export default instance;