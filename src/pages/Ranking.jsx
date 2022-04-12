import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newGame } from '../Redux/Actions';

class Ranking extends Component {
  render() {
    const { playAgain } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <audio src="https://www.myinstants.com/media/sounds/queen-we-are-the-champions-mp3cut_0owsUJJ.mp3" autoPlay={true} />
        {
          ranking.sort((a, b) => b.score - a.score).map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="Player gravatar" />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </div>
          ))
        }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ playAgain }
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(newGame()),
});

Ranking.propTypes = {
  playAgain: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Ranking);
