import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.addToLocalStorage();
  }

  addToLocalStorage = () => {
    const { assertions, score } = this.props;
    localStorage.setItem('assertions', JSON.stringify(assertions));
    localStorage.setItem('score', JSON.stringify(score));
  }

  render() {
    const { assertions, score } = this.props;
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
            <button type="button" data-testid="btn-play-again">Play Again</button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
