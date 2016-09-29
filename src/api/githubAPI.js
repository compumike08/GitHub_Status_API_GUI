import * as CONSTANTS from '../utils/constants';

let Octokat = require('octokat');
let octo = new Octokat({});

class GithubApi {
  static addTokenToOcto(token){
    octo = new Octokat({
      token: token
    });
  }

  static testOctokat(){
    return new Promise((resolve, reject) => {
      octo.repos('compumike08', 'GitHub_Status_API_GUI').fetch().then(result => {
        resolve(result);
      }).catch(error => {
        let errObj = JSON.parse(error.message);

        if(errObj.message == CONSTANTS.GITHUB_ERR_BAD_CREDENTIALS){
          reject("ERROR: Bad credentials");
        }else{
          console.log(error);
          reject("ERROR: An unknown error has occurred.");
        }
      });
    });
  }
}

export default GithubApi;
