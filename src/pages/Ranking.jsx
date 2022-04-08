import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { newGame } from '../Redux/Actions';

class Ranking extends Component {
  render() {
    const { playAgain } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ playAgain }
            >
              Play Again
            </button>
          </Link>
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
