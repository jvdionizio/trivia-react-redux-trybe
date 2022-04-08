import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { newGame } from '../Redux/Actions';

class Feedback extends Component {
  componentDidMount() {
    this.addToLocalStorage();
  }

  addToLocalStorage = () => {
    const currentRanking = JSON.parse(localStorage.getItem('ranking'));
    if (currentRanking) {
      const { score, playerName, gravatarEmail } = this.props;
      const hashEmail = md5(gravatarEmail).toString();
      const picture = `https://www.gravatar.com/avatar/${hashEmail}`;
      const newPlayer = {
        name: playerName,
        score,
        picture,
      };
      const ranking = [...currentRanking, newPlayer];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const { score, playerName, gravatarEmail } = this.props;
      const hashEmail = md5(gravatarEmail).toString();
      const picture = `https://www.gravatar.com/avatar/${hashEmail}`;
      const newPlayer = [{
        name: playerName,
        score,
        picture,
      }];
      localStorage.setItem('ranking', JSON.stringify(newPlayer));
    }
  }

  render() {
    const { assertions, score, playAgain } = this.props;
    const TRES = 3;
    return (
      <>
        <Header />
        { assertions < TRES
          ? (
            <div>
              <p data-testid="feedback-text">Could be better...</p>
            </div>
          ) : (
            <div>
              <p data-testid="feedback-text">Well Done!</p>
            </div>
          )}
        <div>
          <p>Placar:</p>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <div>
          <p>Acertos:</p>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ playAgain }
            >
              Play Again

            </button>
          </Link>
        </div>
        <div>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ranking</button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  playerName: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  playAgain: () => dispatch(newGame()),
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
