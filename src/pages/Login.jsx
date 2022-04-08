import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import GameSettings from '../components/GameSettings';
import { fetchToken, gravatarAction, nameAction } from '../Redux/Actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isButtonDisabled: true,
      settings: false,
    };
  }

  validateButton = () => {
    const { email, name } = this.state;
    const minPasswordLength = 0;
    const emailFormatRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (name.length > minPasswordLength && email.match(emailFormatRegex)) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  settingsPage = () => {
    const { settings } = this.state;
    this.setState({
      settings: !settings,
    });
  }

onInputChange = ({ target }) => {
  this.setState({ [target.name]: target.value }, this.validateButton);
}

handleClick = async () => {
  const { getFetchToken, history, gravatarImg } = this.props;
  const { email } = this.state;
  await getFetchToken();
  gravatarImg(email);
  history.push('/game');
}

render() {
  const { isButtonDisabled, name, settings, email } = this.state;
  const { nameProp } = this.props;
  nameProp(name);
  if (settings) {
    return (
      <GameSettings loginPage={ this.settingsPage } />
    );
  }
  return (
    <>
      <label htmlFor="nameInput">
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          id="nameInput"
          value={ name }
          onChange={ this.onInputChange }
        />
      </label>

      <label htmlFor="gravatarEmailInput">
        <input
          type="email"
          name="email"
          id="gravatarEmailInput"
          data-testid="input-gravatar-email"
          onChange={ this.onInputChange }
          value={ email }
        />
      </label>
      <button
        disabled={ isButtonDisabled }
        type="button"
        data-testid="btn-play"
        onClick={ this.handleClick }
      >
        Play
      </button>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.settingsPage }
      >
        Settings
      </button>
    </>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  getFetchToken: () => dispatch(fetchToken()),
  gravatarImg: (gravatar) => dispatch(gravatarAction(gravatar)),
  nameProp: (name) => dispatch(nameAction(name)),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  getFetchToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
