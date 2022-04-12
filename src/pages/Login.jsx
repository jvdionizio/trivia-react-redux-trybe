import PropTypes from 'prop-types';
import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { connect } from 'react-redux';
import '../App.css';
import Logo from '../images/trivia.svg';
import { fetchToken, gravatarAction, nameAction } from '../Redux/Actions';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isButtonDisabled: true,
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
    const { history } = this.props;
    history.push('/settings');
  }

onInputChange = ({ target }) => {
  this.setState({ [target.name]: target.value }, this.validateButton);
}

handleClick = async () => {
  const { getFetchToken, history, gravatarImg, link } = this.props;
  const { email } = this.state;
  await getFetchToken(link);
  gravatarImg(email);
  history.push('/game');
}

render() {
  const { isButtonDisabled, name, email } = this.state;
  const { nameProp } = this.props;
  nameProp(name);
  return (
    <div className={ `${styles['login-background']}` }>
      <main className={ `col-11 m-auto ${styles['main-login']}` }>
        <div className={ `${styles['login-container']}` }>
          <img
            className={ `${styles['logo-image']} img-fluid` }
            src={ Logo }
            alt="Trivia Logo"
          />
          <label htmlFor="nameInput">
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              id="nameInput"
              value={ name }
              onChange={ this.onInputChange }
              placeholder="Digite o seu nome"
              className={ styles['input-login'] }
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
              placeholder="Digite o seu melhor email"
              className={ styles['input-login'] }
            />
          </label>
          <button
            disabled={ isButtonDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            className={ `${styles['button-play']}` }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsPage }
            className={ `${styles['button-settings']}` }
          >
            <AiFillSetting />
          </button>
        </div>
      </main>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  getFetchToken: (link) => dispatch(fetchToken(link)),
  gravatarImg: (gravatar) => dispatch(gravatarAction(gravatar)),
  nameProp: (name) => dispatch(nameAction(name)),
});

const mapStateToProps = (state) => ({
  token: state.token,
  link: state.game.linkQuestionsApi,
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  getFetchToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
