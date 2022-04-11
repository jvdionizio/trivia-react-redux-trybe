import React, { Component } from 'react';
import styles from '../styles/Podium.module.css';

class Podium extends Component {
  render() {
    return (
      <>
        <h2 className={ `${styles['podium-title']}` }>Podium</h2>

        <div className={ `${styles['podium-container']}` }>

          <div className={ `${styles['podium-col']}` }>

            <div className={ `${styles['podium-1']} col-4 mx-auto` }>1</div>

            <div className={ `${styles['podium-row']} col-11 mx-auto` }>
              <div className={ `${styles['podium-2']} col-6` }>2</div>
              <div className={ `${styles['podium-3']} col-6` }>3</div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default Podium;
