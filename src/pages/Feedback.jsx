import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { correctAnswers } = this.props;
    const TRES = 3;
    return (
      <>
        <Header />
        <div>
          <span data-testid="header-score">Valor Atual</span>
        </div>
        {
          correctAnswers > TRES ? (
            <div>
              <p data-testid="feedback-text">Could be better...</p>
            </div>
          ) : (
            <div>
              <p data-testid="feedback-text">Well Done!</p>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswers: state.player.qtdCorrectAnswers,
});

Feedback.propTypes = {
  correctAnswers: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
