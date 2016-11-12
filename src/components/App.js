import React, {PropTypes} from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends React.Component {
  getChildContext() {
    return {
      location: this.props.location
    };
  }

  render() {
    return (
      <div>
        <Header/>

        <div className="container-fluid">
          {this.props.children}
        </div>

        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object
};

App.childContextTypes = {
  location: PropTypes.object
};

export default App;
