import React from 'react';
import GithubAPI from '../../api/githubAPI';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showResult: "l"
    };

    this.invokeGitHubAPI = this.invokeGitHubAPI.bind(this);

  }

  invokeGitHubAPI(){
    GithubAPI.testOctokat().then(testResult => {
      let parsedTestResult = testResult.updatedAt.toDateString();
      console.log(testResult);
      console.log(parsedTestResult);
      this.setState({showResult: parsedTestResult});
    }).catch(error => {
      throw(error);
    });
  }

  render() {
      return (
        <div>
          <h1>GitHub Status API GUI</h1>
          <h3>Open browser console to see JSON data returned from GitHub API</h3>

          <div className="row">
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary" onClick={this.invokeGitHubAPI}>Test GitHub API Call</button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <span>{this.state.showResult}</span>
            </div>
          </div>
        </div>
      );
  }
}

export default HomePage;
