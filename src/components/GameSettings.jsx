import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import '../App.css';

class GameSettings extends React.Component {
  render() {
    const { loginPage } = this.props;
    return (
      <>
        <h2 data-testid="settings-title"> Settings </h2>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ loginPage }
        >
          {' '}
          Voltar

        </button>
      </>
    );
  }
}

GameSettings.propTypes = {
  loginPage: PropTypes.func.isRequired,
};

export default GameSettings;
