import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import profilePictureAPI from '../Helpers/profilePictureAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      imageScr: '',
    };
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture = async () => {
    const { email } = this.props;
    const data = await profilePictureAPI(email);
    console.log(data);
    this.setState({ imageScr: data });
  };

  render() {
    const { email } = this.props;
    const { imageScr } = this.state;
    return (
      <div>
        <img
          src={ imageScr }
          alt="Ícone do Jogador"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{email}</p>
        <p data-testid="header-score">Placar: 0</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
