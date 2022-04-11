import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { answerQuestion, setTimer } from '../Redux/Actions';
import styles from '../styles/Game.module.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const interval = 1000;

    this.counter = setInterval(() => {
      this.handleSeconds();
    }, interval);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { setAnswer } = this.props;
    if (seconds === 0) {
      clearInterval(this.counter);
      setAnswer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  handleSeconds = () => {
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    }));
    const { seconds } = this.state;
    const { timer } = this.props;
    timer(seconds);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div className={ `${styles['timer-background']}` }>
        <span className={ `${styles.timer}` }>{seconds}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timer: (seconds) => dispatch(setTimer(seconds)),
  setAnswer: () => dispatch(answerQuestion()),
});

const mapStateToProps = (store) => ({
  answered: store.game.answered,
});

Timer.propTypes = {
  timer: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
