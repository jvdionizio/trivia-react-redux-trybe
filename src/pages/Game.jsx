import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  render() {
    const { results, answered } = this.props;
    console.log(results);
    return (
      <div>
        <Header />
        {answered === 'respondido' ? '' : <Timer />}
        <h1>Jogo</h1>
        <Question />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
  current: state.game.currentQuestion,
  answered: state.game.answered,
});

Game.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps)(Game);
