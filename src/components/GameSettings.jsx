import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSettings } from '../Redux/Actions';

class GameSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfQuestions: 5,
      category: '',
      difficulty: '',
      type: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.validateButton);
  }

  loginPage = () => {
    const { history, applySettings } = this.props;
    const { numberOfQuestions, category, difficulty, type } = this.state;

    const questions = numberOfQuestions ? `amount=${numberOfQuestions}` : '';
    const selectedCategory = category !== ('') ? `&category=${category}` : '';
    const selectedDifficulty = difficulty !== ('') ? `&difficulty=${difficulty}` : '';
    const selectedType = type !== '' ? `&type=${type}` : '';

    const link = `https://opentdb.com/api.php?${questions}${selectedCategory}${selectedDifficulty}${selectedType}`;

    applySettings(link);
    history.push('/');
  }

  render() {
    const { numberOfQuestions } = this.state;
    return (
      <>
        <h2 data-testid="settings-title"> Settings </h2>
        <form action="" method="post">
          <label htmlFor="numberOfQuestions">
            <input
              name="numberOfQuestions"
              type="numberOfQuestions"
              id="numberOfQuestions"
              value={ numberOfQuestions }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="category">
            Select Category:
            <select id="category" name="category" onChange={ this.onInputChange }>
              <option value="">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>
            </select>
          </label>

          <label htmlFor="difficulty">
            Select Difficulty:
            <select
              name="difficulty"
              id="difficulty"
              onChange={ this.onInputChange }
            >
              <option value="">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label htmlFor="type">
            Select Type:
            <select
              name="type"
              id="type"
              onChange={ this.onInputChange }
            >
              <option value="">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
        </form>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.loginPage }
        >
          {' '}
          Voltar

        </button>
      </>
    );
  }
}

GameSettings.propTypes = {
  applySettings: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  applySettings: (settings) => dispatch(addSettings(settings)),
});

export default connect(null, mapDispatchToProps)(GameSettings);
