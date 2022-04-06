import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import '../styles/Question.css';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      correctAnswer: '',
      answers: [],
      loading: true,
      color: false,
    };
  }

  componentDidMount() {
    const { incorrectAnswersGame, correctAnswerGame } = this.props;
    this.setState({
      correctAnswer: correctAnswerGame,
      answers: [...incorrectAnswersGame, correctAnswerGame],
    }, () => this.handleQuestions());
  }

  handleQuestions = () => {
    const { answers } = this.state;
    const random = this.shuffleAnswers(answers);
    this.setState({
      answers: random,
      loading: false,
    });
  }

  // Função para ramdomizar o array de respostas baseado no algoritimo de Fisher–Yates shuffle
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleAnswers = (array) => {
    let currentIndex = array.length; let
      randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  isCorrect = (answer) => {
    const { correctAnswer, answers } = this.state;
    const wrongAnswers = answers.filter((a) => a !== correctAnswer);
    if (correctAnswer === answer) return 'correct-answer';
    return (`wrong-answer-${wrongAnswers.indexOf(answer)}`);
  }

  handleClick = () => {
    this.setState({
      color: true,
    });
  }

  isActive = (answer) => {
    const { color, correctAnswer } = this.state;
    if (color === true) {
      if (correctAnswer === answer) return 'correct-answer';
      return 'wrong-answer';
    }
  }

  verifyTimer = () => {
    const { timer } = this.props;
    if (timer === 0) {
      return true;
    }
  }

  render() {
    const { results, currentQuestion } = this.props;
    const { loading, answers } = this.state;
    return (
      <div>
        {loading === true
          ? <Loading />
          : (
            <div>
              <h2 data-testid="question-category">{results[currentQuestion].category}</h2>
              <p data-testid="question-text">
                {results[currentQuestion].question}
              </p>
              <div data-testid="answer-options">
                {answers.map((answer, index) => (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ this.isCorrect(answer) }
                    className={ this.isActive(answer) }
                    onClick={ this.handleClick }
                    disabled={ this.verifyTimer() }
                  >
                    {answer}
                  </button>))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
  currentQuestion: state.game.currentQuestion,
  correctAnswerGame: state.game.results[0].correct_answer,
  incorrectAnswersGame: state.game.results[0].incorrect_answers,
  timer: state.game.timer,
});

Question.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Question);
