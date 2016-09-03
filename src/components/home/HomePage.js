import React from 'react';
import GithubAPI from '../../api/githubAPI';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showResult: {}
    };

  }

  componentDidMount(){
    GithubAPI.testOctokat().then(testResult => {
      this.setState({showResult: testResult});
      console.log(testResult);
    }).catch(error => {
      throw(error);
    });

  }

    render() {
        return (
          <div>
            <h1>GitHub Status API GUI</h1>
            <h3>Open browser console to see JSON data returned from GitHub API</h3>
          </div>
        );
    }
}

export default HomePage;
