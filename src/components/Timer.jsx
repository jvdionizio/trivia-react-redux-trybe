import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTimer } from '../Redux/Actions';

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
    if (seconds === 0) {
      clearInterval(this.counter);
    }
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
      <div>
        <h3>Timer</h3>
        <span>{seconds}</span>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  timer: (seconds) => dispatch(setTimer(seconds)),
});

Timer.propTypes = {
  timer: PropTypes.number,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
