import {CONFIG_SERVER_PATH} from '../utils/constants';
import $ from 'jquery';

class ConfigServerApi {
  static getConfigProps() {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "GET",
        url: CONFIG_SERVER_PATH
      }).done(function (data) {
        resolve(data);
      }).fail(function (error) {
        console.log(error);
        reject(error);
      });
    });
  }
}

export default ConfigServerApi;
