import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const emailHash = md5(email).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="Ícone do Jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <span>
          <p>Placar:</p>
          <p data-testid="header-score">{score}</p>
        </span>
      </div>
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
