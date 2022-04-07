import React from 'react';
import PropTypes from 'prop-types';

class NextButton extends React.Component {
  render() {
    const { nextQuestion } = this.props;
    console.log(nextQuestion);
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
