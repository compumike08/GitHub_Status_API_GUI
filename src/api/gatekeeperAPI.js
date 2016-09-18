import * as CONSTANTS from '../utils/constants';
import $ from 'jquery';

class GatekeeperApi {
  static exchangeCodeForToken(tempCode){
    let fullRequestURL = CONSTANTS.GATEKEEPER_AUTH_URL + tempCode;
    return new Promise((resolve, reject) => {
      $.ajax({
          method: "GET",
          url: fullRequestURL
        }).done(function(data){
          let oauthToken = data.token;
          resolve(oauthToken);
        }).fail(function(error){
          console.log(error);
          reject(error);
        });
    });
  }
}

export default GatekeeperApi;
