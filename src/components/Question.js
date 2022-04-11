import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addQtdCorrectAnswers, addScore,
  answerQuestion, nextQuestion,
} from '../Redux/Actions';
import '../styles/Question.css';
import styles from '../styles/Question.module.css';
import Loading from './Loading';
import NextButton from './NextButton';

const he = require('he');

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
    if (currentQuestion < results.length - 1) {
      btnNextQuestion(currentQuestion + 1);
      this.setState({
        color: false,
        correctAnswer: results[currentQuestion + 1].correct_answer,
        questionAnswered: false,
        answers: [...results[currentQuestion + 1].incorrect_answers,
          results[currentQuestion + 1].correct_answer],
      }, () => this.handleQuestions());
    }
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
    const { score, newScore, countCorrectAnswers, assertions } = this.props;
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
      countCorrectAnswers(assertions + 1);
    }
  };

  handleClick = (selected) => {
    const { timer, results, currentQuestion, setAnswer } = this.props;
    const level = results[currentQuestion].difficulty;
    this.setState({
      color: true,
    });
    this.scoreCalculation(selected, timer, level);
    this.setState({
      questionAnswered: true,
    });
    setAnswer();
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
    /* if (timer === 0) {
      setAnswer();
    } */
    if (timer === 0 || questionAnswered === true) {
      return true;
    }
  }

  render() {
    const { results, currentQuestion, timer } = this.props;
    const { loading, answers, questionAnswered } = this.state;
    return (
      <div>
        {loading === true
          ? <Loading />
          : (
            <>
              <div
                className={ `${styles['question-container']} 
              col-10 m-auto mb-3` }
              >
                <span
                  data-testid="question-category"
                >
                  {results[currentQuestion].category}
                </span>
                <h2
                  data-testid="question-text"
                  className="m-auto"
                >
                  {he.decode(results[currentQuestion].question)}
                </h2>
                <div className={ `${styles['next-question-container']} col-lg-6 m-auto` }>
                  { questionAnswered && (currentQuestion < results.length - 1
                    ? <NextButton nextQuestion={ this.setNextQuestion } />
                    : <Link to="/feedback"><NextButton /></Link>) }
                  { timer === 0 && (currentQuestion < results.length - 1
                    ? <NextButton nextQuestion={ this.setNextQuestion } />
                    : <Link to="/feedback"><NextButton /></Link>) }
                </div>
              </div>
              <div
                data-testid="answer-options"
                className={ `${styles['answers-container']} 
                col-11 m-auto row mb-3` }
              >
                {answers.map((answer, index) => (
                  <>
                  <button
                    type="button"
                    key={ index }
                    data-testid={ this.isCorrect(answer) }
                    className={
                      `${styles['answer-text']} ${this.isActive(answer)} col-lg-5`
                    }
                    onClick={ () => this.handleClick(answer) }
                    disabled={ this.verifyTimer() }
                  >
                    {he.decode(answer)}
                  </button>
                  <audio src='https://www.myinstants.com/media/sounds/vinheta-faustao-errou-rede-globo.mp3' autoplay controls/>
                  </>))}
              </div>
            </>
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
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  newScore: (score) => dispatch(addScore(score)),
  btnNextQuestion: (question) => dispatch(nextQuestion(question)),
  countCorrectAnswers: (answer) => dispatch(addQtdCorrectAnswers(answer)),
  setAnswer: () => dispatch(answerQuestion()),
});

Question.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  results: PropTypes.arrayOf(PropTypes.any),
  currentQuestion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
