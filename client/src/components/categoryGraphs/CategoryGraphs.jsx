import React from 'react';
import PropTypes from 'prop-types';
import classes from './Graph.module.css';
import GraphRender from './GraphRender';

export default function CategoryGraphs({ ratings, isForModal }) {
  return (
    <div className={classes.allGraphs}>
      {ratings.map((data, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <GraphRender key={index} rating={data} isForModal={isForModal} />
      ))}
    </div>
  );
}

CategoryGraphs.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  isForModal: PropTypes.bool.isRequired,
};
