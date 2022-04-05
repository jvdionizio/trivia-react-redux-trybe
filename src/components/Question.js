import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
  render() {
    const { results, currentQuestion } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{results[currentQuestion].category}</h2>
        <p data-testid="question-text">
          {results[currentQuestion].question}
        </p>
        <div>
          <button type="button">Teste</button>
          <button type="button">Teste2</button>
          <button type="button">Teste3</button>
          <button type="button">Teste4</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
  currentQuestion: state.game.currentQuestion,
});

Question.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Question);
