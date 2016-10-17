import React, {PropTypes} from 'react';

class App extends React.Component {
    render() {
        return (
          <div>
            <div className="page-header">
              <h1>GitHub Status API GUI</h1>
            </div>

            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
