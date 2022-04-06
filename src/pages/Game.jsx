import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { results } = this.props;
    console.log(results);
    return (
      <div>
        <Header />
        <h1>Jogo</h1>
        <Question />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
});

Game.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Game);
