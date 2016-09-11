import React from 'react';
import GithubAPI from '../../api/githubAPI';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showResult: "NO DATA - Click button below to fetch data."
    };

    this.invokeGitHubAPI = this.invokeGitHubAPI.bind(this);

  }

  invokeGitHubAPI(){
    GithubAPI.testOctokat().then(testResult => {
      let parsedTestResult = testResult.pushedAt.toTimeString();
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

          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="pushedDateTime" className="col-sm-2 control-label">Date/Time of Last Push to Repo:</label>
              <div className="col-sm-6">
                <input id="pushedDateTime" className="form-control" readOnly value={this.state.showResult}/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <button type="button" className="btn btn-primary" onClick={this.invokeGitHubAPI}>Test GitHub API Call</button>
            </div>
          </div>
        </div>
      );
  }
}

export default HomePage;
