import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatar, name } = this.props;
    console.log(gravatar);
    return (
      <div>
        <img
          src={ gravatar }
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
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  gravatar: store.player.gravatarEmail,
  name: store.player.name,
});

export default connect(mapStateToProps)(Header);
