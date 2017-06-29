import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as configActions from '../actions/configActions';
import Header from './common/Header';
import Footer from './common/Footer';

import toastr from 'toastr';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getChildContext = this.getChildContext.bind(this);
  }

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  componentWillMount() {
    this.props.actions.loadConfigProps().then(() => {
      toastr.success("Succesfully loaded application configuration properties.");
    }).catch(error => {
      console.log(error);
      toastr.error("Unable to load application configuration properties.");
    });
  }

  render() {
    return (
      <div>
        <Header/>

        <div className="container-fluid">
          {this.props.children}
        </div>

        <Footer configs={this.props.configs}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
  configs: PropTypes.object.isRequired,
  actions: {
    loadConfigProps: PropTypes.function
  }
};

App.childContextTypes = {
  location: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(configActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    configs: state.configs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
