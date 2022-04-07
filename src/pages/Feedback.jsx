import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <span data-testid="header-score">Valor Atual</span>
        </div>
      </>
    );
  }
}

export default Feedback;
