let Octokat = require('octokat');
let octo = new Octokat({});

class GithubApi {
  static testOctokat(){
    return new Promise((resolve) => {
      resolve(octo.repos('compumike08', 'GitHub_Status_API_GUI').fetch());
    });
  }
}

export default GithubApi;
