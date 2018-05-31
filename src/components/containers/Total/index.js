import React, { Component } from 'react';
import { Subscribe } from 'statable';

import { cost } from '../../state';
import styles from './styles';

export default class Total extends Component {
  componentDidMount() {
    cost.subscribe(state => {
      console.log(state);
    });
  }

  componentWillUnmount() {
    cost.unsubscribe();
  }

  render() {
    return (
      <Subscribe to={cost}>
        {state => (
          <div className="zygoteTotalLine">
            <div className="zygoteTotalHead">Total</div>
            <div className="zygoteTotal">
              ${state.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
            <style jsx global>
              {styles}
            </style>
          </div>
        )}
      </Subscribe>
    );
  }
}
