import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    console.log(email);
    const emailHash = md5(email).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="Ícone do Jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">Placar: 0</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.player.name,
  loading: store.player.loading,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
