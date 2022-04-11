import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { IoLogoGameControllerA } from 'react-icons/io';
import { connect } from 'react-redux';
import styles from '../styles/Header.module.css';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const emailHash = md5(email).toString();
    return (
      <header className={ `${styles['main-header-container']}` }>
        <div className={ `${styles['info-container']} col-11 m-auto` }>
          <div className={ `${styles['player-container']}` }>
            <img
              src={ `https://www.gravatar.com/avatar/${emailHash}` }
              alt="Ícone do Jogador"
              data-testid="header-profile-picture"
              className={ `${styles['gravatar-image']}` }
            />
            <span
              data-testid="header-player-name"
              className={ `${styles['player-name']}` }
            >
              { name }
            </span>
          </div>
          <div className={ `${styles['score-container']}` }>
            <IoLogoGameControllerA className={ `${styles['controller-icon']}` } />
            <span className={ `${styles['score-text']}` }>
              Score:
            </span>
            <span
              data-testid="header-score"
              className={ `${styles['score-number']}` }
            >
              {score}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.player.name,
  loading: store.player.loading,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Header);
