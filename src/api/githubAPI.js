let Octokat = require('octokat');
let octo = new Octokat({});

class GithubApi {
  static addTokenToOcto(token){
    octo = new Octokat({
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
