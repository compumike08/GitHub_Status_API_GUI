import {GITHUB_USER_NAME, GITHUB_REPO_NAME, GITHUB_ERR_BAD_CREDENTIALS} from '../utils/constants';
let Octokat = require('octokat');

let octo = new Octokat({});

class GithubApi {
  static addTokenToOcto(token){
    octo = new Octokat({
      token: token
    });
  }

  static removeTokenFromOcto(){
    return new Promise((resolve) => {
      octo = new Octokat({});
      resolve();
    });
  }

  static testOctokat(){
    return new Promise((resolve, reject) => {
      octo.repos(GITHUB_USER_NAME, GITHUB_REPO_NAME).fetch().then(result => {
        resolve(result);
      }).catch(error => {
        let errMsg = getErrorResponseMsg(error);

        if(errMsg == GITHUB_ERR_BAD_CREDENTIALS){
          reject("ERROR: Bad credentials");
        }else{
          console.log(error);
          reject("ERROR: An unknown error has occurred.");
        }
      });
    });
  }
}

function parseErrorResponse(error){
  let errObj = JSON.parse(error.message);
  return errObj;
}

function getErrorResponseMsg(error){
  let errObj = parseErrorResponse(error);
  let errMsg = errObj.message;

  return errMsg;
}

export default GithubApi;
