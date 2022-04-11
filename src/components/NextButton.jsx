import PropTypes from 'prop-types';
import React from 'react';
import { MdNavigateNext } from 'react-icons/md';
import styles from '../styles/NextButton.module.css';

class NextButton extends React.Component {
  render() {
    const { nextQuestion } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ nextQuestion }
        className={ `${styles['next-button']}` }
      >
        <MdNavigateNext />
      </button>
    );
  }
}

NextButton.propTypes = {
  nextQuestion: PropTypes.func,
}.isRequire;

export default NextButton;
