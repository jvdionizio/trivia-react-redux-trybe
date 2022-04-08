import PropTypes from 'prop-types';
import React from 'react';

class NextButton extends React.Component {
  render() {
    const { nextQuestion } = this.props;
    return (
      <div>
        <button
          data-testid="btn-next"
          type="button"
          onClick={ nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  nextQuestion: PropTypes.func,
}.isRequire;

export default NextButton;
