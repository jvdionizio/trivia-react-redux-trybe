import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { newGame } from '../Redux/Actions';
import styles from '../styles/Feedback.module.css';

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
      <div className={ `${styles['feedback-container']}` }>
        <Header />
        <audio src="https://www.myinstants.com/media/sounds/victoryff.swf.mp3" autoPlay={true} />
        <div className={ `${styles['message-container']} col-8 m-auto mt-5` }>
          <div className={ `${styles['result-message']} col-8 mx-auto mb-5` }>
            { assertions < TRES
              ? (
                <h1
                  data-testid="feedback-text"
                  className={ `${styles['message-text']}` }
                >
                  Could be better...
                </h1>
              ) : (
                <h1
                  data-testid="feedback-text"
                  className={ `${styles['message-text']}` }
                >
                  Well Done!
                </h1>
              )}
          </div>
          <div className={ `${styles['result-container']} col-8 mx-auto mb-5` }>
            <div className={ `${styles['score-container']} col-10 mx-auto` }>
              <h3 className={ `${styles['h3-title']}` }>Score:</h3>
              <h3 data-testid="feedback-total-score">{score}</h3>
            </div>
            <div className={ `${styles['assertions-container']} col-10 mx-auto` }>
              <h3 className={ `${styles['h3-title']}` }>Assertions:</h3>
              <h3 data-testid="feedback-total-question">{assertions}</h3>
            </div>
          </div>
          <div className={ `${styles['buttons-container']}` }>
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ playAgain }
                className={ `${styles.button}` }
              >
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
                className={ `${styles.button}` }
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
      </div>
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
