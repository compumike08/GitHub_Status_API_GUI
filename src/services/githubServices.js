import GithubAPI from '../api/githubAPI';

export function loadStoredTokenIntoOcto(oauthToken){
  return new Promise((resolve, reject) => {
    if(oauthToken.length <= 0){
      console.log("storedToken variable = " + oauthToken);
      reject("Unable to retrieve valid stored oauth token from Redux store");
    }

    return GithubAPI.addTokenToOcto(oauthToken).then(() => {
      resolve();
    }).catch(error => {
      console.log(error);
      reject("Unable to add OAuth token to Octokat instance");
    });
  });
}
