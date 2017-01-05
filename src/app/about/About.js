import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { autobind } from 'core-decorators';
import { createStructuredSelector as select } from 'reselect';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardList,
  CardTitle,
  renderMarkdown,
} from 'styled';

import kitten from './kitten.jpg';
import * as aboutActions from './actions';
import { getAbout } from './selectors';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(aboutActions.loadAbout()),
}])

@connect(select({
  about: getAbout,
}))

// eslint-disable-next-line react/prefer-stateless-function
export default class About extends React.Component {
  static propTypes = {
    about: PropTypes.any.isRequired,
  };

  state = {
    showKitten: false,
  }

  @autobind
  handleToggleKitten() {
    this.setState({ showKitten: !this.state.showKitten });
  }

  render() {
    const { showKitten } = this.state;
    return (
      <CardList>
        <Card>
          <CardTitle>About this project:</CardTitle>
          <CardContent>
            {renderMarkdown(this.props.about)}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4>Psst! Would you like to see a kitten?</h4>
            {showKitten && <img src={kitten} alt="kitten" />}
          </CardContent>
          <CardActions>
            <Button onClick={this.handleToggleKitten}>
              {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
            </Button>
          </CardActions>
        </Card>
      </CardList>
    );
  }
}