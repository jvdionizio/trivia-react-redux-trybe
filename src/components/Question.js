import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import '../styles/Question.css';
import { addScore, nextQuestion } from '../Redux/Actions';
import NextButton from './NextButton';

class Question extends Component {
  constructor() {
    super();

    this.state = {
      correctAnswer: '',
      answers: [],
      loading: true,
      color: false,
      questionAnswered: false,
    };
  }

  componentDidMount() {
    const { results, currentQuestion } = this.props;
    this.setState({
      correctAnswer: results[currentQuestion].correct_answer,
      answers: [...results[currentQuestion].incorrect_answers,
        results[currentQuestion].correct_answer],
    }, () => this.handleQuestions());
  }

  setNextQuestion = () => {
    const { currentQuestion, btnNextQuestion, results } = this.props;
    btnNextQuestion(currentQuestion + 1);
    this.setState({
      correctAnswer: results[currentQuestion].correct_answer,
      questionAnswered: false,
      answers: [...results[currentQuestion].incorrect_answers,
        results[currentQuestion].correct_answer],
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

  scoreCalculation = (answer, timer, difficulty) => {
    const { correctAnswer } = this.state;
    const { score, newScore } = this.props;
    let difficultyValue = 0;
    const UM = 1;
    const DOIS = 2;
    const TRES = 3;
    const DEZ = 10;
    if (difficulty === 'hard') {
      difficultyValue = TRES;
    }
    if (difficulty === 'medium') {
      difficultyValue = DOIS;
    }
    if (difficulty === 'easy') {
      difficultyValue = UM;
    }
    if (correctAnswer === answer) {
      newScore(score + DEZ + (difficultyValue * timer));
    }
  };

  handleClick = (selected) => {
    const { timer, results, currentQuestion } = this.props;
    const level = results[currentQuestion].difficulty;
    this.setState({
      color: true,
    });
    this.scoreCalculation(selected, timer, level);
    this.setState({
      questionAnswered: true,
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
    const { questionAnswered } = this.state;
    const { timer } = this.props;
    if (timer === 0 || questionAnswered === true) {
      return true;
    }
  }

  render() {
    const { results, currentQuestion } = this.props;
    const { loading, answers, questionAnswered } = this.state;
    return (
      <div>
        {loading === true
          ? <Loading />
          : (
            <div>
              { questionAnswered && <NextButton nextQuestion={ this.setNextQuestion } /> }
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
                    onClick={ () => this.handleClick(answer) }
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
  timer: state.game.timer,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  newScore: (score) => dispatch(addScore(score)),
  btnNextQuestion: (question) => dispatch(nextQuestion(question)),
});

Question.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
