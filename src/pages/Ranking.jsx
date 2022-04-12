import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { newGame } from '../Redux/Actions';
import styles from '../styles/Ranking.module.css';

class Ranking extends Component {
  render() {
    const { playAgain } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className={ `${styles['ranking-background']}` }>
        <div className={ `${styles['ranking-container']} col-10 m-auto` }>

          <h1
            data-testid="ranking-title"
            className={ `${styles['ranking-title']} col-12` }
          >
            Ranking
          </h1>
          <audio src="https://www.myinstants.com/media/sounds/queen-we-are-the-champions-mp3cut_0owsUJJ.mp3" autoPlay={true} />
          <div className={ `${styles['info-container']} col-12` }>

            {/* <div className="col-md-5 m-auto">
              <Podium />
            </div> */}

            <div className="col-11 m-auto">
              {
                ranking.sort((a, b) => b.score - a.score).map((player, index) => (
                  <div
                    key={ index }
                    className={ `${styles['players-list']} col-8 m-auto mb-3` }
                  >
                    <div className={ `${styles['gravatar-container']} col-5` }>
                      <img
                        src={ player.picture }
                        alt="Player gravatar"
                        className={ `${styles['gravatar-image']}` }
                      />
                    </div>
                    <span className="col-1" />
                    <div className={ `${styles['span-container']} col-5` }>
                      <div className={ `${styles['span-div']}` }>
                        <span className={ `${styles['span-text']}` }>
                          Name:
                        </span>
                        <span
                          data-testid={ `player-name-${index}` }
                          className={ `${styles['span-result']}` }
                        >
                          {`${player.name}`}
                        </span>
                      </div>
                      <div className={ `${styles['span-div']}` }>
                        <span className={ `${styles['span-text']}` }>
                          Score:
                        </span>
                        <span
                          data-testid={ `player-score-${index}` }
                          className={ `${styles['span-result']}` }
                        >
                          {`${player.score}`}
                        </span>
                      </div>
                    </div>

                  </div>
                ))
              }
            </div>

          </div>

          <div className={ `${styles['play-again-container']}` }>
            <Link to="/">
              <button
                type="button"
                data-testid="btn-go-home"
                onClick={ playAgain }
                className={ `${styles.button}` }
              >
                Play Again
              </button>
            </Link>
          </div>

        </div>
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
