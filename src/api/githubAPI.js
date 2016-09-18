let Octokat = require('octokat');
let octo = new Octokat({});

class GithubApi {
  constructor(){
    this.octo = new Octokat({});
  }

  static newOctokatNoToken(){
    this.octo = new Octokat({});
  }

  static newOctokatWithToken(token){
    this.octo = new Octokat({
      token: token
    });
  }

  static testOctokat(){
    return new Promise((resolve) => {
      resolve(octo.repos('compumike08', 'GitHub_Status_API_GUI').fetch());
    });
  }
}

export default GithubApi;
