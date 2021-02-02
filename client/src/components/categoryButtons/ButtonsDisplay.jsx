/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Buttons.module.css';

// eslint-disable-next-line react/prop-types
export default function ButtonsDisplay({ categories, clicked }) {
  return (
    <div id="ButtonList">
      {categories.map((category, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <button type="button" key={index} className={classes.btn} id={index} data-testid={category.title} onClick={clicked}>
          {category.title} {category.count}
        </button>
      ))}
    </div>
  );
}

ButtonsDisplay.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
