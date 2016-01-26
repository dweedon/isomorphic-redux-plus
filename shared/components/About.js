import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import { loadAbout }         from 'actions/AboutActions';
import fetchData            from 'lib/fetchData';

@fetchData((state, dispatch) => dispatch(loadAbout()))
@connect(state => ({about: state.about}))
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className="about" dangerouslySetInnerHTML={{__html: this.props.about}} />
    );
  }
}
